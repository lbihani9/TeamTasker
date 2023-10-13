const express = require('express');
const {
  createTaskLabel,
  deleteTaskLabel,
} = require('../controllers/task-labels');
const taskLabelRouter = express.Router();

taskLabelRouter.post('/', createTaskLabel);
taskLabelRouter.delete('/:id', deleteTaskLabel);

module.exports = {
  taskLabelRouter,
};
