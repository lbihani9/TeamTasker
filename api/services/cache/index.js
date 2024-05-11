const Redis = require('ioredis');
const { logger } = require('../logger');

class RedisSingleton {
  constructor() {
    try {
      if (!RedisSingleton.instance) {
        // https://www.npmjs.com/package/ioredis#connect-to-redis
        this.redis = new Redis({
          port: process.env.REDIS_PORT,
          host: process.env.REDIS_IP,
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
          db: 0,
        });

        // this.redis.monitor((err, monitor) => {
        //   monitor.on('monitor', (time, args) => {
        //     console.log(`Redis query: ${args}`);
        //   });
        // });

        RedisSingleton.instance = this;
        module.exports.redis = this.redis;

        logger.info('Initialized redis instance...');
      }

      return RedisSingleton.instance;
    } catch (err) {
      logger.info('Failed to initialize redis instance.');
      logger.error(err);
      process.exit(1);
    }
  }
}

module.exports.createRedisInstance = () => new RedisSingleton();
