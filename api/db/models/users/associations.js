const { db } = require('../../../services/database');

db.Users.hasMany(db.Sessions, {
  foreignKey: 'userId',
});

db.Users.hasMany(db.Projects, {
  foreignKey: 'projectableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.Users.belongsToMany(db.Tasks, {
  through: db.TaskAssignees,
  as: 'assignedTasks',
  foreignKey: 'userId',
  otherKey: 'taskId',
});

db.Users.hasMany(db.Tasks, {
  foreignKey: 'taskableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.Users.hasMany(db.Tasks, {
  foreignKey: 'createdBy',
  as: 'createdTasks',
});

db.Users.hasMany(db.Statuses, {
  foreignKey: 'statusableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.Users.hasMany(db.Projects, {
  foreignKey: 'createdBy',
  as: 'createdProjects',
});

db.Users.hasMany(db.Organizations, {
  foreignKey: 'organizationId',
  as: 'ownedOrganizations',
});

db.Users.hasMany(db.Labels, {
  foreignKey: 'labelableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.Users.belongsToMany(db.Teams, {
  through: db.TeamMembers,
  foreignKey: 'userId',
  otherKey: 'teamId',
});

db.Users.belongsToMany(db.Organizations, {
  through: db.OrganizationMembers,
  foreignKey: 'userId',
  otherKey: 'organizationId',
});

db.Users.hasMany(db.TaskComments, {
  foreignKey: 'createdBy',
});

