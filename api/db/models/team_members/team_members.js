const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

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
});

module.exports = {
  key: 'TeamMembers',
  value: TeamMembers,
};

require('./helper_methods');