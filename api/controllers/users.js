const { db } = require('../db/models');
const { Tasks, Users, TaskAssignees, Organizations } = db.models;

const getUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching user details.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.params.username,
      },
    });

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

module.exports = {
  getUser,
  patchUser
};
