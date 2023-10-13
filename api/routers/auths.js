const express = require('express');
const authRouter = express.Router();
const {
  login,
  logout,
  oAuthCallback,
  getLoginStatus,
} = require('../controllers/auths');

authRouter.get(`/login`, login);
authRouter.get(`/google/callback`, oAuthCallback);
authRouter.get(`/logout`, logout);
authRouter.get(`/login-status`, getLoginStatus);

module.exports = {
  authRouter,
};
