const { db } = require('../db/models');
const { Sessions } = db.models;

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
        const session = await Sessions.findOne({ where: { email } });
        await session.destroy();
      }
      return;
    }

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
