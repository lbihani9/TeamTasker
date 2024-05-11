const { db } = require('../../../services/database');

db.TaskAssignees.belongsTo(db.Tasks, {
  foreignKey: 'taskId',
});

db.TaskAssignees.belongsTo(db.Users, {
  foreignKey: 'userId',
});