const express = require('express');
const {
  createTask,
  patchTask,
  deleteTask,
  getTaskComments,
  getTask,
  bulkPatchTaskLabels,
} = require('../controllers/tasks');
const taskRouter = express.Router();

taskRouter.post('/', createTask);
taskRouter.patch('/:id', patchTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.get('/:id/comments', getTaskComments);
taskRouter.get('/:id', getTask);
taskRouter.patch('/:id/task-labels/bulk', bulkPatchTaskLabels)

module.exports = {
  taskRouter,
};
