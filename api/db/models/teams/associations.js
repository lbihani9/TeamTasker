const { db } = require('../../../services/database');

db.Teams.belongsTo(db.Organizations, {
  foreignKey: 'organizationId',
});

db.Teams.hasMany(db.Labels, {
  foreignKey: 'labelableId',
  constraints: false,
  scope: {
    taskableType: 'user',
  },
});

db.Teams.belongsToMany(db.Users, {
  through: db.TeamMembers,
  foreignKey: 'teamId',
  otherKey: 'userId',
});

db.Teams.hasMany(db.Projects, {
  foreignKey: 'projectableId',
  constraints: false,
  scope: {
    taskableType: 'team',
  },
});
