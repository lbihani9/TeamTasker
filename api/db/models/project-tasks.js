const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const ProjectTasks = sequelize.define('projectTasks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  taskId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'tasks',
    },
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'projects',
    },
    allowNull: false,
  },
});

module.exports = {
  ProjectTasks,
};
