const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  patchUser,
  getUsers,
  getUserDashboard,
} = require('../controllers/users');

userRouter.get('', getUsers);
userRouter.get(':id', getUser);
userRouter.patch(':id', patchUser);
userRouter.get('/dashboard', getUserDashboard);

module.exports = {
  userRouter,
};
