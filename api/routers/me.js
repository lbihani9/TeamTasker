const express = require('express');
const myRouter = express.Router();
const {
  getMyProjects,
  getMyTasks,
  getMyOrganizations,
} = require('../controllers/me');

myRouter.get('/tasks', getMyTasks);
myRouter.get('/organizations', getMyOrganizations);
myRouter.get('/projects', getMyProjects);

module.exports = {
  myRouter,
};
