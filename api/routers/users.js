const express = require('express');
const { createUser, patchUser } = require('../controllers/users');
const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.patch('/:id', patchUser);

module.exports = {
  userRouter,
};
