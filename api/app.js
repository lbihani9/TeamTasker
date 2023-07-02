require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;
const { sequelize } = require('./db');
const { router: v1Router } = require('./routers/routers');
const { authRouter } = require('./routers/auths');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

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
  prefix: 'session:',
});

app.use(
  session({
    store: redisStore,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      path: '/', 
      httpOnly: true, 
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds 
    }
  })
);

sequelize.sync();

module.exports = {
  redisClient
}

app.use('/auth', authRouter);

app.use('/api/v1', v1Router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});
