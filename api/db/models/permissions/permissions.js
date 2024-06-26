const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const Permissions = sequelize.define('permissions', {
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
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  key: 'Permissions',
  value: Permissions,
};

require('./helper_methods');