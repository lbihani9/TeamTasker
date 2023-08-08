const express = require('express');
const router = express.Router();
const { userRouter } = require('./users');
const { taskRouter } = require('./tasks');
const { myRouter } = require('./me');
const { projectRouter } = require('./projects');
const { organizationRouter } = require('./organizations');
const { teamRouter } = require('./teams');

router.use('/@me', myRouter);
router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/projects', projectRouter);
router.use('/organizations', organizationRouter);
router.use('/teams', teamRouter);

module.exports = {
  router,
};
