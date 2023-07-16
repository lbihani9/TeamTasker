const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const TaskAssignees = sequelize.define('taskAssignees', {
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
  assignee: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'users',
    },
    allowNull: false,
  },
});

module.exports = {
  TaskAssignees,
};
