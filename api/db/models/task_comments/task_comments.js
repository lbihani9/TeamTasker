const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database');

const TaskComments = sequelize.define('taskComments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'users',
    },
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
  comment: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
});

module.exports = {
  key: 'TaskComments',
  value: TaskComments,
};

require('./helper_methods');