const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  patchUser,
} = require('../controllers/users');

userRouter.get(':username', getUser);
userRouter.patch(':username', patchUser);

module.exports = {
  userRouter,
};
