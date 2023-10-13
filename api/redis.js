require('dotenv').config();
const Redis = require('ioredis');
const session = require('express-session');
const { REDIS_SESSION_KEY_PREFIX } = require('./utils/constants');
const RedisStore = require('connect-redis').default;

const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_IP}:${process.env.REDIS_PORT}`;

const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_IP,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

redisClient.monitor((err, monitor) => {
  monitor.on('monitor', (time, args) => {
    console.log(`Redis query: ${args}`);
  });
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: REDIS_SESSION_KEY_PREFIX,
});

module.exports = {
  redisClient,
  redisStore,
  session,
};
