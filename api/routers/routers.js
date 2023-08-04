const express = require('express');
const router = express.Router();
const { userRouter } = require('./users');
const { taskRouter } = require('./tasks');
const { myRouter } = require('./me');
const { projectRouter } = require('./projects');

router.use('/@me', myRouter);
router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/projects', projectRouter);

module.exports = {
  router,
};