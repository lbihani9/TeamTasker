const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  patchUser,
  getUsers,
  getUserOrganizations
} = require('../controllers/users');

userRouter.get(':username', getUser);
userRouter.patch(':username', patchUser);
userRouter.get('/organizations', getUserOrganizations)

module.exports = {
  userRouter,
};
