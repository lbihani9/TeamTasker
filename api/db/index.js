import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 10000 },
    benchmark: true, // logs query execution time.
    define: {
      freezeTableName: true,
      timestamps: true,
      underscored: false,
    }
  },
);

export default sequelize;