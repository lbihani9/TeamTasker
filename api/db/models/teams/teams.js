const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const Teams = sequelize.define('teams', {
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
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  organizationId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'organizations',
    },
    allowNull: false,
  },
});

module.exports = {
  key: 'Teams',
  value: Teams,
};

require('./helper_methods');