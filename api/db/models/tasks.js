const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

const Tasks = sequelize.define(
  'tasks',
  {
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
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    taskableType: {
      type: DataTypes.ENUM,
      values: ['user', 'project'],
      allowNull: false,
      defaultValue: 'user',
    },
    taskableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'statuses',
      },
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
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
  },
  {
    getterMethods: {
      getTaskable(options) {
        if (!this.taskableType) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.taskableType)}`;
        return this[mixinMethodName];
      },
    },
  }
);

Tasks.addHook('afterFind', (findResult) => {
  if (findResult === null) {
    return;
  }
  if (!Array.isArray(findResult)) {
    findResult = [findResult];
  }

  for (const instance of findResult) {
    const { taskableType, project = undefined, user = undefined } = instance;

    if (taskableType === 'user' && user !== undefined) {
      instance.dataValues.taskable = user.dataValues;
    } else if (taskableType === 'project' && project !== undefined) {
      instance.dataValues.taskable = project.dataValues;
    }

    // To prevent mistakes:
    delete instance.user;
    delete instance.dataValues.user;
    delete instance.project;
    delete instance.dataValues.project;
  }
});

module.exports = {
  Tasks,
};
