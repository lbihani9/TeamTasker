const { db } = require('../db/models');
const { Tasks, Users, TaskAssignees, Organizations } = db.models;

const getUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
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
    const user = await Users.findByPk(req.params.id);
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
    let { limit, offset } = req.query;

    limit = typeof limit === 'undefined' ? 50 : min(max(1, Number(limit)), 50);
    offset = typeof offset === 'undefined' ? 0 : Number(offset);

    const tasks = await TaskAssignees.findAll({
      where: {
        assignee: req.user.id,
      },
      limit,
      offset,
    });

    res.status(200).json({
      data: {
        tasks,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: err.message,
        },
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
  getUserDashboard,
};
