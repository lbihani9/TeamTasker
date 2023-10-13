const express = require('express');
const {
  getProjectActionItems,
  getLabelActionItems,
} = require('../controllers/search');
const searchRouter = express.Router();

searchRouter.get('/projects/action-items', getProjectActionItems);
searchRouter.get('/labels/action-items', getLabelActionItems);

module.exports = {
  searchRouter,
};
