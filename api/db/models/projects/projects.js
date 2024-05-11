const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

const Projects = sequelize.define(
  'projects',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    projectableType: {
      type: DataTypes.ENUM,
      values: ['user', 'team'],
      allowNull: false,
      defaultValue: 'user',
    },
    projectableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'users',
      },
      allowNull: true,
    },
  },
  {
    getterMethods: {
      getProjectable(options) {
        if (!this.projectableType) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.projectableType)}`;
        return this[mixinMethodName];
      },
    },
  }
);

Projects.addHook('afterFind', (findResult) => {
  if (findResult === null) {
    return;
  }
  if (!Array.isArray(findResult)) {
    findResult = [findResult];
  }

  for (const instance of findResult) {
    const { projectableType, team = undefined, user = undefined } = instance;

    if (projectableType === 'user' && user !== undefined) {
      instance.dataValues.projectable = user.dataValues;
    } else if (projectableType === 'team' && team !== undefined) {
      instance.dataValues.projectable = team.dataValues;
    }

    // To prevent mistakes:
    delete instance.user;
    delete instance.dataValues.user;
    delete instance.team;
    delete instance.dataValues.team;
  }
});

module.exports = {
  key: 'Projects',
  value: Projects,
};

require('./helper_methods');