const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const Statuses = sequelize.define('statuses', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statusableType: {
    type: DataTypes.ENUM,
    values: ['user', 'project'],
    allowNull: false,
    defaultValue: 'user',
  },
  statusableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Statuses.addHook('afterFind', (findResult) => {
  if (findResult === null) {
    return;
  }
  if (!Array.isArray(findResult)) {
    findResult = [findResult];
  }

  for (const instance of findResult) {
    const { statusableType, project = undefined, user = undefined } = instance;

    if (statusableType === 'user' && user !== undefined) {
      instance.dataValues.statusable = user.dataValues;
    } else if (statusableType === 'project' && project !== undefined) {
      instance.dataValues.statusable = user.dataValues;
    }

    // To prevent mistakes:
    delete instance.user;
    delete instance.dataValues.user;
    delete instance.project;
    delete instance.dataValues.project;
  }
});

module.exports = {
  key: 'Statuses',
  value: Statuses,
};

require('./helper_methods');