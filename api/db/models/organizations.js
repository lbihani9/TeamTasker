const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Organizations = sequelize.define('organizations', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    allowNull: true,
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
  ownedBy: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'users',
    },
    allowNull: true,
  },
});

module.exports = {
  Organizations,
};
