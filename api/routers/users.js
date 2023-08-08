const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  patchUser,
} = require('../controllers/users');

userRouter.get('/:username', getUser); // tested
userRouter.patch('/:username', patchUser); // tessted

module.exports = {
  userRouter,
};
