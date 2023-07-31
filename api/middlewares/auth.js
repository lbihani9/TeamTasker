const { db } = require('../db/models');

const validateSession = async (req, res, next) => {
  try {
    const { maxAge, email = null } = req.session.cookie;
    if (maxAge <= 0 || !email) {
      await req.session.destroy();

      res.status(401).json({
        data: {
          url: '/',
        },
      });

      if (email) {
        const session = await db.models.Sessions.findOne({ where: { email } });
        await session.destroy();
      }
      return;
    }

    req.user = await db.models.Users.findOne({ where: { email }});

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An internal server error occured.',
        },
      ],
    });
  }
};

module.exports = {
  validateSession,
};
