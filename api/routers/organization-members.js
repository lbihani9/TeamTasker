const express = require('express');
const {
  createOrganizationMember,
  deleteOrganizationMember,
} = require('../controllers/organization-members');
const organizationMemberRouter = express.Router();

organizationMemberRouter.post('/', createOrganizationMember);
organizationMemberRouter.delete('/:id', deleteOrganizationMember);

module.exports = {
  organizationMemberRouter,
};
