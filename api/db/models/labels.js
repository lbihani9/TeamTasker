const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

const Labels = sequelize.define(
  'labels',
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labelableType: {
      type: DataTypes.ENUM,
      values: ['user', 'team'],
      allowNull: false,
      defaultValue: 'user',
    },
    labelableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    getterMethods: {
      getLabelable(options) {
        if (!this.labelableType) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.labelableType)}`;
        return this[mixinMethodName];
      },
    },
  }
);

Labels.addHook('afterFind', (findResult) => {
  if (findResult === null) {
    return;
  }
  if (!Array.isArray(findResult)) {
    findResult = [findResult];
  }

  for (const instance of findResult) {
    const { labelableType, team = undefined, user = undefined } = instance;

    if (labelableType === 'user' && user !== undefined) {
      instance.dataValues.labelable = user.dataValues;
    } else if (labelableType === 'team' && team !== undefined) {
      instance.dataValues.labelable = team.dataValues;
    }

    // To prevent mistakes:
    delete instance.user;
    delete instance.dataValues.user;
    delete instance.team;
    delete instance.dataValues.team;
  }
});

module.exports = {
  Labels,
};
