const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const OrganizationMembers = sequelize.define('organizationMembers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  organizationId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'organizations',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'users',
    },
    allowNull: false,
  },
});

module.exports = {
  key: 'OrganizationMembers',
  value: OrganizationMembers,
};

require('./helper_methods');