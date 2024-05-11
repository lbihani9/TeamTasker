const { db } = require('../../../services/database');

db.TaskComments.belongsTo(db.Tasks, {
  foreignKey: 'taskId',
});

db.TaskComments.belongsTo(db.Users, {
  foreignKey: 'createdBy',
});