require('dotenv').config();
require('./services/logger').createLoggerInstance();
require('./services/database').createDbInstance();
require('./services/cache').createRedisInstance();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { router } = require('./routers/routes');
const { authRouter } = require('./routers/auths');
const { validateSession } = require('./middlewares/validate-session');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { redis } = require('./services/cache');
const { REDIS_SESSION_KEY_PREFIX } = require('./utils/constants');
const morgan = require('morgan');
const { logger } = require('./services/logger');

const redisStore = new RedisStore({
  client: redis,
  prefix: REDIS_SESSION_KEY_PREFIX,
});

const app = express();

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: logger.stream,
  })
);

if (process.env.ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    origin: process.env.APP_ORIGIN,
    exposedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
  })
);

app.use(
  session({
    store: redisStore,
    /**
     * This option determines whether to save the session data to the store on every request,
     * even if the session has not been modified during the request. Setting resave to false prevents
     * unnecessary session updates and can improve performance.
     */
    resave: false,
    /**
     * This option specifies whether to save new sessions to the store, even if they haven't been modified.
     * Setting saveUninitialized to false prevents the creation of empty sessions for each visitor and can help
     * conserve server storage space.
     */
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.ENV === 'development' ? false : true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in millisecond
      httpOnly: false,
      sameSite: process.env.ENV === 'development' ? false : 'none',
    },
    // If set to true, the session cookie's expiration time will be reset on each request
    rolling: false,
    // deletes the session immediately when it expires
    unset: 'destroy',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './client/build')));
}

app.use('/auth', authRouter);

app.use('/api/v1', validateSession, router);

app.get('*', (req, res) => {
  if (process.env.ENV === 'production') {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  } else {
    res.status(404).json({});
  }
});

app.listen(process.env.APP_PORT, () => {
  logger.info(`Express server is listening on port ${process.env.APP_PORT}`);
});
