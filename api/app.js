require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { router } = require('./routers/routes');
const { sequelize } = require('./db');
const { redisStore, session } = require('./redis');
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

app.use(
  session({
    store: redisStore,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      path: '/',
      // httpOnly: true,
      httpOnly: false,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
  })
);

sequelize.sync();

app.use('/auth', authRouter);

app.use('/api/v1', router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});
