const express = require('express');
const {
  getOrganizationTeams,
  createOrganzationTeam,
} = require('../controllers/organizations');
const organizationRouter = express.Router();

organizationRouter.get('/:id/teams', getOrganizationTeams); // tested
organizationRouter.post('/:id/teams', createOrganzationTeam); // tested

module.exports = {
  organizationRouter,
};
