const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const Roles = sequelize.define('roles', {
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
});

module.exports = {
  key: 'Roles',
  value: Roles,
};

require('./helper_methods');