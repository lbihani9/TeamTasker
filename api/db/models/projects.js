const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Projects = sequelize.define('projects', {
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
  isOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'teams',
    },
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'users',
    },
    allowNull: false,
  },
});

module.exports = {
  Projects,
};
