const { models } = require('../db/models');
const { controllerErrorHandler } = require('../utils/utils');

// TODO: Remove hardcoding

const createProject = async (req, res) => {
  try {
    const { projectableType, projectableId } = req.body;

    if (!projectableType || projectableType === 'user') {
      req.body.projectableId = 1;
      req.body.projectableType = 'user';
    } else if (!projectableId) {
      return res.status(403).json({
        errors: [
          {
            message:
              'If a project is part of a team in an organization, then team id is required.',
          },
        ],
      });
    }

    // TODO (Lokesh): Add `beforeBulkCreate`, `beforeCreate` hooks to validate statusId.

    let project = await models.Projects.create({
      ...req.body,
      createdBy: 1,
    });

    project = await models.Projects.findOne({
      where: {
        id: project.id,
      },
      include: [
        models.Users,
        models.Teams,
        {
          model: models.Users,
          as: 'projectAuthor',
        },
      ],
    });

    res.status(201).json({
      data: project,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the project.'
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

const patchProject = async (req, res) => {
  try {
    delete req.body.projectableType;
    delete req.body.projectableId;

    const project = await models.Projects.findOne({
      where: {
        id: req.params.id,
      },
      include: [models.Users, models.Teams],
    });

    if (!project) {
      return res.status(404).json({
        errors: [
          {
            message: 'Project not found.',
          },
        ],
      });
    }

    await project.update(req.body);

    res.status(200).json({
      data: project,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while updating the project.'
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

// TODO
const deleteProject = async (req, res) => {};

const getProjectTasks = async (req, res) => {
  try {
    const tasks = await models.Tasks.findAll({
      where: {
        taskableType: 'project',
        taskableId: req.params.id,
      },
      include: [
        {
          model: models.Users,
          through: {
            attributes: [],
          },
          as: 'assignees',
          attributes: ['id', 'name', 'email', 'username', 'avatar'],
        },
        {
          model: models.Labels,
          through: models.TaskLabels,
        },
        models.Statuses,
      ],
    });

    const project = await models.Projects.findByPk(req.params.id);

    res.status(200).json({
      data: {
        tasks,
        project
      },
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching the tasks associated with this project.'
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
  createProject,
  patchProject,
  deleteProject,
  getProjectTasks,
};
