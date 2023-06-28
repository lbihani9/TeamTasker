const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  patchUser,
  deleteUser,
} = require('../controllers/users');

userRouter.get(`/users/:id`, getUser);
userRouter.patch(`/users/:id`, patchUser);
userRouter.delete(`/users/:id`, deleteUser);

module.exports = {
  userRouter,
};
