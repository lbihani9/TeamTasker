const { Op } = require('sequelize');
const { db } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching user info.',
        },
      ],
    });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const projects = await db.Projects.findAll({
      where: {
        projectableType: 'user',
        projectableId: req.user.id,
      },
      include: [
        {
          model: db.Users,
          as: 'projectAuthor',
        },
        {
          model: db.Users,
        },
        {
          model: db.Teams,
        },
      ],
    });

    res.status(200).json({
      data: projects,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching your Projects.'
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

const getMyLabels = async (req, res) => {
  try {
    const { count: total, rows: labels } = await db.Labels.findAndCountAll({
      where: {
        labelableType: 'user',
        labelableId: req.user.id,
      },
      include: [
        {
          model: db.Users,
        },
        {
          model: db.Teams,
        },
      ],
    });

    res.status(200).json({
      data: labels,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching your Labels.'
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

const getMyOrganizations = async (req, res) => {
  try {
    const organizations = await db.Organizations.findAll({
      include: [
        {
          model: db.Users,
          through: {
            attributes: [],
          },
          where: {
            id: req.user.id,
          },
          attributes: [],
        },
      ],
    });

    res.status(200).json({
      data: organizations,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching your Organizations.'
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

const getMyTask = async (req, res) => {
  try {
    const task = await db.Tasks.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.Labels,
          through: db.TaskLabels,
        },
        {
          model: db.Users,
          as: 'taskAuthor',
        },
        db.Statuses,
        db.Users,
        db.Projects,
      ],
    });

    res.status(200).json({
      data: task,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching your Task.'
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

const getMyTasks = async (req, res) => {
  try {
    const tasks = await db.Tasks.findAll({
      include: [
        {
          model: db.Users,
          through: {
            attributes: [],
          },
          as: 'assignees',
          where: {
            id: req.user.id,
          },
          attributes: ['id', 'name', 'email', 'username', 'avatar'],
        },
        {
          model: db.Labels,
          through: db.TaskLabels,
        },
        db.Statuses,
        db.Projects,
        db.Users,
      ],
    });

    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching your Tasks.'
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
  getMyProjects,
  getMyLabels,
  getMyOrganizations,
  getMyTask,
  getMyTasks,
  getMyProfile,
};
