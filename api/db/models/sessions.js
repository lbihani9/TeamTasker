const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

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
  expiresIn: {
    type: DataTypes.INTEGER,
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
  Sessions,
};
