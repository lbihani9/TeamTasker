const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const TeamMembers = sequelize.define('teamMembers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'teams',
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
  TeamMembers,
};
