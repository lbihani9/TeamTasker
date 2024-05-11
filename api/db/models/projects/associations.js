const { db } = require('../../../services/database');

db.Projects.belongsTo(db.Users, {
  foreignKey: 'projectableId',
  constraints: false,
});

db.Projects.belongsTo(db.Teams, {
  foreignKey: 'projectableId',
  constraints: false,
});

db.Projects.belongsTo(db.Users, {
  foreignKey: 'createdBy',
  as: 'projectAuthor',
});

db.Projects.hasMany(db.Tasks, {
  foreignKey: 'taskableId',
  constraints: false,
  scope: {
    taskableType: 'project',
  },
});

db.Projects.hasMany(db.Statuses, {
  foreignKey: 'statusableId',
  constraints: false,
  scope: {
    taskableType: 'project',
  },
});
