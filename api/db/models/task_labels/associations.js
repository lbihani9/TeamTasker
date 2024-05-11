const { db } = require('../../../services/database');

db.TaskLabels.belongsTo(db.Labels, {
  foreignKey: 'labelId',
});

db.TaskLabels.belongsTo(db.Tasks, {
  foreignKey: 'taskId',
});