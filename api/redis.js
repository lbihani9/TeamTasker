require('dotenv').config();
const redis = require('redis');
const session = require('express-session');
const { REDIS_SESSION_KEY_PREFIX } = require('./utils/constants');
const RedisStore = require('connect-redis').default;

const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_IP}:${process.env.REDIS_PORT}`;
const redisClient = redis.createClient({
  url: redisURL,
});

redisClient
  .connect()
  .then(() => console.log(`Redis server is listening on ${redisURL}`))
  .catch((err) =>
    console.log('Could not establish connection with redis' + err)
  );

const redisStore = new RedisStore({
  client: redisClient,
  prefix: REDIS_SESSION_KEY_PREFIX,
});

module.exports = {
  redisClient,
  redisStore,
  session,
};
