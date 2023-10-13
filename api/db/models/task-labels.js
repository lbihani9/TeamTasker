const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const TaskLabels = sequelize.define('taskLabels', {
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
  labelId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'labels',
    },
    allowNull: false,
  },
});

module.exports = {
  TaskLabels,
};
