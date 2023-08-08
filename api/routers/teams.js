const express = require('express');
const {
  getTeamProjects,
  getTeamMembers,
  addTeamMember,
  createTeamProject,
} = require('../controllers/teams');
const teamRouter = express.Router();

teamRouter.get('/:id/projects', getTeamProjects); // tested
teamRouter.get('/:id/members', getTeamMembers); // tested

teamRouter.post('/:id/members', addTeamMember); // tested
teamRouter.post('/:id/projects', createTeamProject); // tested

module.exports = {
  teamRouter,
};
