const { models } = require('../db/models');
const { redisClient } = require('../redis');
const { REDIS_USER_KEY_PREFIX } = require('../utils/constants');

const validateSession = async (req, res, next) => {
  try {
    if (req.session && req.session.cookie.maxAge > 0 && req.session.userId) {
      const { userId } = req.session;
      let user = await redisClient.get(`${REDIS_USER_KEY_PREFIX}${userId}`);

      if (!user) {
        user = await models.Users.findByPk(Number(userId));

        if (user) {
          req.user = user.toJSON();
          await redisClient.setex(
            `${REDIS_USER_KEY_PREFIX}${userId}`,
            3600,
            JSON.stringify(user.toJSON())
          );
          /**
           * `return` is required because although `next()` calls the next middleware, but when those middleware returns, the code written
           * after `next()` runs.
           */
          return next();
        }
      } else {
        req.user = JSON.parse(user);
        return next();
      }
    }

    if (req.session && req.session.userId) {
      const session = await models.Sessions.findOne({
        where: {
          userId: req.session.userId,
        },
      });

      if (session) {
        await session.destroy({ force: true });
      }

      req.session.destroy(async (err) => {
        if (err) {
          console.log(err);
        }
        return;
      });
    }

    return res.status(401).json({
      data: {
        url: 'login',
      },
      message: 'Your session expired.'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          message: 'An error occured while trying to validate the session.'
        }
      ]
    })
  }
};

module.exports = {
  validateSession,
};
