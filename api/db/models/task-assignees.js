const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const TaskAssignees = sequelize.define('taskAssignees', {
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
  assignee: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'users',
    },
    allowNull: false,
  },
});

module.exports = {
  TaskAssignees,
};
