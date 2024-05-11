const { db } = require('../../../services/database');

db.TeamMembers.belongsTo(db.Users, {
  foreignKey: 'userId',
});

db.TeamMembers.belongsTo(db.Teams, {
  foreignKey: 'teamId',
});