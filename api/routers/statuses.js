const express = require('express');
const {
  createStatus,
  patchStatus,
  deleteStatus,
} = require('../controllers/statuses');
const statusRouter = express.Router();

statusRouter.post('/', createStatus); // tested
statusRouter.patch('/:id', patchStatus); // tested
statusRouter.delete('/:id', deleteStatus); // tested

module.exports = {
  statusRouter,
};
