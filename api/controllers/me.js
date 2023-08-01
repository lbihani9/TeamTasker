const { db } = require('../db/models');
const { TaskAssignees, Projects } = db.models;

const getMyOrganizations = async (req, res) => {
  try {
    const { user } = req;
    const organizations = await user.getOrganizations();
    res.status(200).json({
      data: {
        organizations,
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

const getMyTasks = async (req, res) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching the tasks.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      where: {
        teamId: null,
      },
    });

    res.status(200).json({
      data: {
        projects,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching the projects.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

module.exports = {
  getMyOrganizations,
  getMyTasks,
  getMyProjects,
};
