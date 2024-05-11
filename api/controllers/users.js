const { db } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createUser = async (req, res) => {
  try {
    const user = await db.Users.create(req.body);

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the user.'
    );
    res.status(statusCode).json({
      errors: [
        {
          message,
        },
      ],
    });
  }
};

const patchUser = async (req, res) => {
  try {
    delete req.body.username;
    delete req.body.email;

    const user = await db.Users.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            message: "User doesn't exist.",
          },
        ],
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({
        data: user,
      });
    }

    await user.update(req.body);

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while updating the user.'
    );
    res.status(statusCode).json({
      errors: [
        {
          message,
        },
      ],
    });
  }
};

module.exports = {
  createUser,
  patchUser,
};
