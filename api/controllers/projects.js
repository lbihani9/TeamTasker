const { db } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createProject = async (req, res) => {
  try {
    const { projectableType, projectableId } = req.body;

    if (!projectableType || projectableType === 'user') {
      req.body.projectableId = req.user.id;
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

    let project = await db.Projects.create({
      ...req.body,
      createdBy: req.user.id,
    });

    project = await db.Projects.findOne({
      where: {
        id: project.id,
      },
      include: [
        db.Users,
        db.Teams,
        {
          model: db.Users,
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

    const project = await db.Projects.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Users, db.Teams],
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
    const tasks = await db.Tasks.findAll({
      where: {
        taskableType: 'project',
        taskableId: req.params.id,
      },
      include: [
        {
          model: db.Users,
          through: {
            attributes: [],
          },
          as: 'assignees',
          attributes: ['id', 'name', 'email', 'username', 'avatar'],
        },
        {
          model: db.Labels,
          through: db.TaskLabels,
        },
        db.Statuses,
      ],
    });

    const project = await db.Projects.findByPk(req.params.id);

    res.status(200).json({
      data: {
        tasks,
        project,
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
