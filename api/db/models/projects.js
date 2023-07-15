const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Projects = sequelize.define('projects', {
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
  isOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  teamId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'teams',
    },
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'users',
    },
    allowNull: false,
  },
});

module.exports = {
  Projects,
};
