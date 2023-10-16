require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { router } = require('./routers/routes');
const { sequelize } = require('./db');
const { redisStore, session } = require('./redis');
const { authRouter } = require('./routers/auths');
const { validateSession } = require('./middlewares/validate-session');

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

if (process.env.ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')));
}

app.use('/auth', authRouter);

app.use('/api/v1', validateSession, router);

app.get('*', (req, res) => {
  if (process.env.ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
  } else {
    res.status(404).json({});
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});
