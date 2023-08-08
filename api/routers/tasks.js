const express = require('express');
const taskRouter = express.Router();
const { addTaskAssignee } = require('../controllers/tasks');

taskRouter.post('/:id/assignees', addTaskAssignee); // tested

module.exports = {
  taskRouter,
};
