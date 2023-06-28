require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./db');

const { router } = require('./routers/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync();

app.use('/api/v1', router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Express server is listening on port ${process.env.APP_PORT}`);
});
