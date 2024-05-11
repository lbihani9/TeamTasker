const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { logger } = require('../logger');

class SequelizeSingleton {
  constructor() {
    try {
      if (!SequelizeSingleton.instance) {
        this.sequelize = new Sequelize(
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
            benchmark: true,
            define: {
              freezeTableName: true,
              timestamps: true,
              underscored: false,
              paranoid: true,
            },
            logging: (msg, executionTimeInMs) => {
              logger.debug(
                JSON.stringify({
                  query: msg,
                  executedIn: `${executionTimeInMs} ms`,
                })
              );
            },
          }
        );

        SequelizeSingleton.instance = this;
        module.exports.sequelize = this.sequelize;

        logger.info('DB connected...');
        this.initialize();
      }

      return SequelizeSingleton.instance;
    } catch (err) {
      logger.info('Failed to create DB instance.');
      logger.error(err);
      process.exit(1);
    }
  }

  initialize() {
    /**
     * Note: Ideally, the sync methods shouldn't be used because they interfer with the migrations.
     * In dev environment, first run the migrations and then start the server.
     * In production, this has already been taken care of using the `entrypoint.sh` file.
     * 
     * TODO: Fix this issue.
     */
    const db = {};

    try {
      const modelsPath = path.join(__dirname, '../../db/models');

      fs.readdirSync(modelsPath).forEach((subDirectory) => {
        const subDirectoryPath = path.join(modelsPath, subDirectory);
        const files = fs.readdirSync(subDirectoryPath);
        const modelFileName = `${subDirectory}.js`;

        if (!files.includes(modelFileName)) {
          throw new Error(
            `Could not find ${modelFileName} in '${subDirectoryPath}'`
          );
        }

        const modelPath = path.join(subDirectoryPath, modelFileName);
        const { key, value } = require(modelPath);
        db[key] = value;
      });

      this.db = db;
      module.exports.db = this.db;

      logger.info('Initialized models...');

      fs.readdirSync(modelsPath).forEach((subDirectory) => {
        const subDirectoryPath = path.join(modelsPath, subDirectory);
        const files = fs.readdirSync(subDirectoryPath);
        const associationFileName = 'associations.js';

        if (!files.includes(associationFileName)) {
          throw new Error(
            `Could not find ${associationFileName} in '${subDirectoryPath}'`
          );
        }

        const associationPath = path.join(
          subDirectoryPath,
          associationFileName
        );
        console.log(associationPath);
        require(associationPath);
      });

      logger.info('Initialized associations...');

      logger.info('Syncing tables with models...');
      this.sequelize.sync({ alter: true });
      logger.info('Syncing done.')
    } catch (err) {
      this.sequelize.close();
      logger.error(err);
      process.exit(1);
    }
  }
}

module.exports.createDbInstance = () => new SequelizeSingleton();
