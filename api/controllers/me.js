const { Op } = require('sequelize');
const { models } = require('../db/models');
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
    const projects = await models.Projects.findAll({
      where: {
        projectableType: 'user',
        projectableId: req.user.id,
      },
      include: [
        {
          model: models.Users,
          as: 'projectAuthor',
        },
        {
          model: models.Users,
        },
        {
          model: models.Teams,
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
    const { count: total, rows: labels } = await models.Labels.findAndCountAll({
      where: {
        labelableType: 'user',
        labelableId: req.user.id,
      },
      include: [
        {
          model: models.Users,
        },
        {
          model: models.Teams,
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
    const organizations = await models.Organizations.findAll({
      include: [
        {
          model: models.Users,
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
    const task = await models.Tasks.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: models.Labels,
          through: models.TaskLabels,
        },
        {
          model: models.Users,
          as: 'taskAuthor',
        },
        models.Statuses,
        models.Users,
        models.Projects,
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
    const tasks = await models.Tasks.findAll({
      include: [
        {
          model: models.Users,
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
          model: models.Labels,
          through: models.TaskLabels,
        },
        models.Statuses,
        models.Projects,
        models.Users,
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
