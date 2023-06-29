const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  patchUser,
  deleteUser,
  getUsers
} = require('../controllers/users');

userRouter.get(``, getUsers);
userRouter.get(`:id`, getUser);
userRouter.patch(`:id`, patchUser);
userRouter.delete(`:id`, deleteUser);

module.exports = {
  userRouter,
};
