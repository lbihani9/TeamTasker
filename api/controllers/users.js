const { db } = require('../db/models');

const getUser = async (req, res) => {
  try {
    const user = await db.models.Users.findByPk(req.params.id);
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching user details.',
        },
      ],
    });
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await db.models.Users.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
    }
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while updating user details.',
        },
      ],
    });
  }
};

const getUsers = async (req, res) => {
  res.status(200).json({
    data: [],
  });
};

const getUserDashboard = async (req, res) => {
  try {
    const { email } = req.session;
    const user = await db.models.Users.findOne({ where: { email } });

    // TODO: fetch organizations user is part of.
    // TODO: fetch organizations user is owner of.
    // TODO: fetch tasks for today.

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching dashboard details.',
        },
      ],
    });
  }
};

module.exports = {
  getUser,
  patchUser,
  getUsers,
  getUserDashboard
};
