const express = require('express');
const myRouter = express.Router();
const {
  getMyProjects,
  getMyTasks,
  getMyOrganizations,
  createMyOrganization,
  createMyProject,
  createMyTask,
} = require('../controllers/me');

myRouter.get('/tasks', getMyTasks); // tested
myRouter.get('/organizations', getMyOrganizations); // tested
myRouter.get('/projects', getMyProjects); // tested

myRouter.post('/tasks', createMyTask); // tested
myRouter.post('/projects', createMyProject); // tested
myRouter.post('/organizations', createMyOrganization); // tested

module.exports = {
  myRouter,
};
