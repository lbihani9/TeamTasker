const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Sessions = sequelize.define('sessions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  expiresIn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  Sessions,
};
