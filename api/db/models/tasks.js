const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Tasks = sequelize.define('tasks', {
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
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['created', 'assigned', 'inProgress', 'done'],
    allowNull: false,
    defaultValue: 'created',
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
  Tasks,
};
