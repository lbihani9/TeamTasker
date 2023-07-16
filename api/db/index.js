const { Sequelize } = require('sequelize');

// https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    benchmark: true, // logs query execution time.
    define: {
      freezeTableName: true, // stops auto-pluralization by sequelize
      timestamps: true, // automatically adds createdAt, and updatedAt fields to the models
      underscored: false,
    },
  }
);

module.exports = {
  sequelize,
};
