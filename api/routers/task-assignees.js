const express = require('express');
const {
  createTaskAssignee,
  deleteTaskAssignee,
} = require('../controllers/task-assignees');
const taskAssigneeRouter = express.Router();

taskAssigneeRouter.post('/', createTaskAssignee); // tested
taskAssigneeRouter.delete('/:id', deleteTaskAssignee); // tested

module.exports = {
  taskAssigneeRouter,
};
