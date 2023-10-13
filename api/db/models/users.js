const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Users = sequelize.define('users', {
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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
      notEmpty: true, // don't allow empty strings
    },
  },
});

module.exports = {
  Users,
};
