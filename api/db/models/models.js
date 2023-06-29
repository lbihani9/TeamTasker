const { sequelize } = require('..');

const db = {
  models: {},
};

db.sequelize = sequelize;

db.models.Users = require('./users').Users;
db.models.Sessions = require('./auths').Sessions;

module.exports = {
  db,
};
