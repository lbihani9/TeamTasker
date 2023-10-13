const express = require('express');
const {
  createTaskComment,
  deleteTaskComment,
  patchTaskComment,
} = require('../controllers/task-comments');
const taskCommentRouter = express.Router();

taskCommentRouter.post('/', createTaskComment); // tested
taskCommentRouter.patch('/:id', patchTaskComment); // tested
taskCommentRouter.delete('/:id', deleteTaskComment); // tested

module.exports = {
  taskCommentRouter,
};
