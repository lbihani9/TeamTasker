const express = require('express');
const {
  updateProject,
  createProjectTask,
  getProjectTasks,
} = require('../controllers/projects');
const projectRouter = express.Router();

projectRouter.patch('/:id', updateProject); // tested
projectRouter.post('/:id/tasks', createProjectTask); // tested
projectRouter.get('/:id/tasks', getProjectTasks); // tested

module.exports = {
  projectRouter,
};
