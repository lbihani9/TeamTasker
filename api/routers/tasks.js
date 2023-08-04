const express = require('express');
const taskRouter = express.Router();
const {
  createTask
} = require('../controllers/tasks');

taskRouter.post('', createTask);

module.exports = {
  taskRouter,
};
