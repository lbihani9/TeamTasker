const express = require('express');
const {
  createOrganization,
  patchOrganization,
  getOrganizationMembers,
  getOrganizationTeams,
} = require('../controllers/organizations');
const organizationRouter = express.Router();

organizationRouter.post('/', createOrganization); // tested
organizationRouter.patch('/:id', patchOrganization);
organizationRouter.get('/:id/people', getOrganizationMembers);
organizationRouter.get('/:id/teams', getOrganizationTeams); // tested

module.exports = {
  organizationRouter,
};
