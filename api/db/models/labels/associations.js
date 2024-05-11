const { db } = require('../../../services/database');

db.Labels.belongsTo(db.Users, {
  foreignKey: 'labelableId',
  constraints: false,
});

db.Labels.belongsTo(db.Teams, {
  foreignKey: 'labelableId',
  constraints: false,
});

db.Labels.belongsToMany(db.Tasks, {
  through: db.TaskLabels,
  foreignKey: 'labelId',
  otherKey: 'taskId',
});
