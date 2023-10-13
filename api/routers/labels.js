const express = require('express');
const {
  createLabel,
  patchLabel,
  deleteLabel,
} = require('../controllers/labels');

const labelRouter = express.Router();

labelRouter.post('/', createLabel);
labelRouter.patch('/:id', patchLabel);
labelRouter.delete('/:id', deleteLabel);

module.exports = {
  labelRouter,
};
