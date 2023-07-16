const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

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
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'roles',
    },
    allowNull: false,
  },
  hasAccess: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = {
  OrganizationMembers,
};
