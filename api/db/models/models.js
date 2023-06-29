const { sequelize } = require('..');

const db = {
  models: {},
};

db.sequelize = sequelize;

db.models.Users = require('./users').Users;

module.exports = {
  db,
};
