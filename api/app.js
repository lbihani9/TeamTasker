require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const { redisStore } = require('./redis');
const { sequelize } = require('./db');
const { router: v1Router } = require('./routers/routers');
const { authRouter } = require('./routers/auths');
const { validateSession } = require('./middlewares/auth');

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
      httpOnly: true, 
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds 
    }
  })
);

sequelize.sync();

app.use('/auth', authRouter);

app.use('/api/v1', validateSession, v1Router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});
