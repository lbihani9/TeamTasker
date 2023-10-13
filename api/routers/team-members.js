const express = require('express');
const {
  createTeamMember,
  deleteTeamMember,
} = require('../controllers/team-members');

const teamMemberRouter = express.Router();

teamMemberRouter.post('/', createTeamMember);
teamMemberRouter.delete('/:id', deleteTeamMember);

module.exports = {
  teamMemberRouter,
};
