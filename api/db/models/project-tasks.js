const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const ProjectTasks = sequelize.define('projectTasks', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'tasks',
    },
    allowNull: false,
  },
  projectId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'projects',
    },
    allowNull: false,
  },
});

module.exports = {
  ProjectTasks,
};
