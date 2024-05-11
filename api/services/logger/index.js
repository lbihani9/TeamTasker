const winston = require('winston');

// Default log levels.

// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }
class LoggerSingleton {
  constructor() {
    try {
      if (!LoggerSingleton.instance) {
        const env = process.env.ENV;
        this.logger = winston.createLogger(
          env === 'production'
            ? this.getProductionOptions()
            : this.getDevelopementOptions()
        );

        this.logger.stream = {
          write: (message, encoding) => {
            this.logger.http(message.trim());
          },
        };

        LoggerSingleton.instance = this;
        module.exports.logger = this.logger;

        if (env === 'production') {
          console.log(
            'Initialized logger instance... All further logs can be found in "production.log"'
          );
        } else {
          console.log('Initialized logger instance...');
        }
      }
      return LoggerSingleton.instance;
    } catch (err) {
      console.log('Failed to create logger instance.');
      console.log(err.message);
      process.exit(1);
    }
  }

  getProductionOptions() {
    return {
      level: 'http',
      format: winston.format.errors({ stack: true }),
      transports: [
        new winston.transports.File({
          filename: 'production.log',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
      ],
    };
  }

  getDevelopementOptions() {
    return {
      level: 'debug',
      format: winston.format.errors({ stack: true }),
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    };
  }
}

module.exports.createLoggerInstance = () => new LoggerSingleton();