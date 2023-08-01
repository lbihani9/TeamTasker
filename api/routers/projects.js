const express = require('express');
const { createProject, updateProject } = require('../controllers/projects');
const projectRouter = express.Router();

projectRouter.post('', createProject);
projectRouter.patch(':id', updateProject);

module.exports = {
  projectRouter,
};
