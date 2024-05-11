const { db } = require('../../../services/database');

db.Tasks.hasMany(db.TaskComments, {
  foreignKey: 'taskId',
});

db.Tasks.belongsToMany(db.Users, {
  through: db.TaskAssignees,
  as: 'assignees',
  foreignKey: 'taskId',
  otherKey: 'userId',
});

db.Tasks.belongsTo(db.Users, {
  foreignKey: 'createdBy',
  as: 'taskAuthor',
});

db.Tasks.belongsTo(db.Users, {
  foreignKey: 'taskableId',
  constraints: false,
});

db.Tasks.belongsTo(db.Projects, {
  foreignKey: 'taskableId',
  constraints: false,
});

db.Tasks.belongsTo(db.Statuses, {
  foreignKey: 'statusId',
});

db.Tasks.belongsToMany(db.Labels, {
  through: db.TaskLabels,
  foreignKey: 'taskId',
  otherKey: 'labelId',
});
