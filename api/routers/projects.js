const express = require('express');
const {
  createProject,
  patchProject,
  deleteProject,
  getProjectTasks,
} = require('../controllers/projects');
const projectRouter = express.Router();

projectRouter.post('/', createProject); // tested
projectRouter.patch('/:id', patchProject); // tested
projectRouter.get('/:id/tasks', getProjectTasks); // tested

// TODO
// projectRouter.delete('/:id', deleteProject);

module.exports = {
  projectRouter,
};
