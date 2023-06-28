const { sequelize } = require('..');

const db = {};

db.sequelize = sequelize;

db.models.Users = require('./users').Users;
