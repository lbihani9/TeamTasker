const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const StatusTemplates = sequelize.define('statusTemplates', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = {
  StatusTemplates,
};
