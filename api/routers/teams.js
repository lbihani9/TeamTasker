const express = require('express');
const {
  createTeam,
  patchTeam,
  getTeamProjects,
  getTeamLabels,
  getTeamMembers,
} = require('../controllers/teams');

const teamRouter = express.Router();

teamRouter.post('/', createTeam); // tested
teamRouter.patch('/:id', patchTeam);
teamRouter.get('/:id/projects', getTeamProjects); // tested
teamRouter.get('/:id/labels', getTeamLabels);
teamRouter.get('/:id/people', getTeamMembers);

module.exports = {
  teamRouter,
};
