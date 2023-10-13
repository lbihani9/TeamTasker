const express = require('express');
const { labelRouter } = require('./labels');
const { organizationMemberRouter } = require('./organization-members');
const { projectRouter } = require('./projects');
const { statusRouter } = require('./statuses');
const { taskAssigneeRouter } = require('./task-assignees');
const { taskCommentRouter } = require('./task-comment');
const { taskLabelRouter } = require('./task-labels');
const { taskRouter } = require('./tasks');
const { teamMemberRouter } = require('./team-members');
const { teamRouter } = require('./teams');
const { userRouter } = require('./users');
const { myRouter } = require('./me');
const { organizationRouter } = require('./organizations');
const { searchRouter } = require('./search');
const router = express.Router();

router.use('/@me', myRouter); // tested
router.use('/labels', labelRouter); // tested
router.use('/organizations', organizationRouter);
router.use('/organiztion-members', organizationMemberRouter);
router.use('/projects', projectRouter); // tested
router.use('/statuses', statusRouter); // tested
router.use('/task-assignees', taskAssigneeRouter); // tested
router.use('/task-comments', taskCommentRouter); // tested
router.use('/task-labels', taskLabelRouter); // tested
router.use('/tasks', taskRouter); // tested
router.use('/team-members', teamMemberRouter);
router.use('/teams', teamRouter);
router.use('/users', userRouter); // tested
router.use('/search', searchRouter);

module.exports = {
  router,
};
