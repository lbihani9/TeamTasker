const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const Sessions = sequelize.define('sessions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'users',
    },
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    validate: {
      isIP: true,
    },
  },
});

module.exports = {
  key: 'Sessions',
  value: Sessions,
};

require('./helper_methods');