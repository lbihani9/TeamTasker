const express = require('express');
const {
  getMyProjects,
  getMyLabels,
  getMyOrganizations,
  getMyTask,
  getMyTasks,
} = require('../controllers/me');
const myRouter = express.Router();

myRouter.get('/projects', getMyProjects);
myRouter.get('/labels', getMyLabels);
myRouter.get('/organizations', getMyOrganizations);
myRouter.get('/tasks/:id', getMyTask);
myRouter.get('/tasks', getMyTasks);

module.exports = {
  myRouter,
};
