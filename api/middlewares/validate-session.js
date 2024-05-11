const { db } = require('../services/database');
const moment = require('moment');

const validateSession = async (req, res, next) => {
  try {
    if (!req.session?.session) {
      return res.status(401).json({
        message: 'Session has expired.',
      });
    }

    const { session } = req.session;

    const now = moment();
    const expiresAt = moment(session.expiresAt);
    if (expiresAt.isBefore(now)) {
      return res.status(401).json({
        data: {
          url: 'login',
        },
        message: 'Your session expired.',
      });
    }

    const user = await db.Users.findByPk(session.userId);
    if (!user) {
      return res.status(401).json({
        data: {
          url: 'login',
        },
        message: 'Your session expired.',
      });
    }

    req.user = user.toJSON();
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          message: 'An error occured while trying to validate the session.',
        },
      ],
    });
  }
};

module.exports = {
  validateSession,
};
