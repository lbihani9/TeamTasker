const { db } = require('../../../services/database');

db.Sessions.belongsTo(db.Users, {
  foreignKey: 'userId',
});
