const { db } = require('../../../services/database');

db.Statuses.hasMany(db.Tasks, {
  foreignKey: 'statusId',
});

db.Statuses.belongsTo(db.Projects, {
  foreignKey: 'statusableId',
  constraints: false,
});

db.Statuses.belongsTo(db.Users, {
  foreignKey: 'statusableId',
  constraints: false,
});