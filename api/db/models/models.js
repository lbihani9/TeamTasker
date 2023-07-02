const { sequelize } = require('..');

const db = {
  models: {},
};

db.sequelize = sequelize;

db.models.Users = require('./users').Users;
db.models.Sessions = require('./sessions').Sessions;

module.exports = {
  db,
};
