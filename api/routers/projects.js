const express = require('express');
const {
  createProject,
  updateProject,
  getProjects,
} = require('../controllers/projects');
const projectRouter = express.Router();

projectRouter.post('', createProject);
projectRouter.patch(':id', updateProject);
projectRouter.get('', getProjects);

module.exports = {
  projectRouter,
};
