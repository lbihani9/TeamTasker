require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const session = require('express-session');
// const { redisStore } = require('./redis');
// const { sequelize } = require('./_db');
// const { router: v1Router } = require('./_routers/routers');
// const { authRouter } = require('./_routers/auths');
// const { validateSession } = require('./middlewares/validate-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});

// app.use(
//   session({
//     store: redisStore,
//     saveUninitialized: false,
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     cookie: {
//       path: '/', 
//       httpOnly: true, 
//       secure: false, 
//       maxAge: 100 * 24 * 60 * 60 * 1000 // 7 days in milliseconds 
//     }
//   })
// );

// sequelize.sync();

// app.use('/auth', authRouter);

// app.use('/api/v1', v1Router);

