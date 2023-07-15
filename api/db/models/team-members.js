const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const TeamMembers = sequelize.define('teamMembers', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  teamId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'teams',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'users',
    },
    allowNull: false,
  },
  roleId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'roles',
    },
    allowNull: false,
  },
});

module.exports = {
  TeamMembers,
};
