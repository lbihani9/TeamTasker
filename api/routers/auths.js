const express = require('express');
const authRouter = express.Router();
const { login, logout, oAuthCallback } = require('../controllers/auths');

authRouter.get(`/login`, login);
authRouter.get(`/google/callback`, oAuthCallback);
authRouter.get(`/logout`, logout);

module.exports = {
  authRouter,
};
