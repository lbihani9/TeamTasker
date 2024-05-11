const { Op } = require('sequelize');
const { db, sequelize } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createTask = async (req, res) => {
  try {
    const { taskableType, taskableId } = req.body;

    if (!taskableType || taskableType === 'user') {
      req.body.taskableId = req.user.id;
      req.body.taskableType = 'user';
    } else if (!taskableId) {
      return res.status(403).json({
        errors: [
          {
            message:
              'If a task is part of a project, then project id is required.',
          },
        ],
      });
    }

    let task;
    await sequelize.transaction(async (transaction) => {
      task = await db.Tasks.create({
        ...req.body,
        createdBy: req.user.id,
      });

      if (req.body.taskableType === 'user') {
        await db.TaskAssignees.create({
          taskId: task.id,
          userId: req.user.id,
        });
      }
    });

    task = await db.Tasks.findOne({
      where: {
        id: task.id,
      },
      include: [
        db.Statuses,
        db.Projects,
        db.Users,
        {
          model: db.Users,
          as: 'taskAuthor',
        },
        {
          model: db.Labels,
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(201).json({
      data: task,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the task.'
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

const patchTask = async (req, res) => {
  try {
    delete req.body.createdBy;

    const task = await db.Tasks.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        db.Users,
        db.Projects,
        db.Statuses,
        {
          model: db.Users,
          as: 'taskAuthor',
        },
        {
          model: db.Labels,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!task) {
      return res.status(404).json({
        errors: [
          {
            message: 'Task not found.',
          },
        ],
      });
    }

    await task.update(req.body);

    res.status(200).json({
      data: task,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while updating the task.'
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

const deleteTask = async (req, res) => {
  try {
    const task = await db.Tasks.findByPk(req.params.id);
    if (!task) {
      return res.status(202).json({
        data: null,
      });
    }

    await sequelize.transaction(async (transaction) => {
      await db.TaskLabels.destroy({
        where: {
          taskId: task.id,
        },
        transaction,
        force: true,
      });

      await db.TaskAssignees.destroy({
        where: {
          taskId: task.id,
        },
        transaction,
        force: true,
      });

      await db.TaskComments.destroy({
        where: {
          taskId: task.id,
        },
        transaction,
      });

      await task.destroy({ transaction });
    });

    res.status(202).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while deleting the task.'
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

const getTaskComments = async (req, res) => {
  try {
    const comments = await db.TaskComments.findAll({
      where: {
        taskId: req.params.id,
      },
      include: {
        model: db.Users,
      },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json({
      data: comments,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching the task comments.'
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

const getTask = async (req, res) => {
  try {
    const task = await db.Tasks.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.Labels,
          through: {
            attributes: [],
          },
        },
        {
          model: db.Users,
          as: 'taskAuthor',
        },
      ],
    });

    if (task === null) {
      return res.status(404).json({
        errors: [
          {
            message: 'Task not found.',
          },
        ],
      });
    }

    // TODO (Lokesh): Check here whether the user can access this task or not.

    res.status(200).json({
      data: task,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching the task details.'
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

const bulkPatchTaskLabels = async (req, res) => {
  try {
    const { remove = [], create = [] } = req.body;

    if (remove.length > 0) {
      await db.TaskLabels.destroy({
        where: {
          [Op.and]: [
            {
              taskId: req.params.id,
            },
            {
              labelId: remove,
            },
          ],
        },
        force: true,
      });
    }

    if (create.length > 0) {
      await db.TaskLabels.bulkCreate(
        create.map((c) => ({ taskId: req.params.id, labelId: c }))
      );
    }

    const taskLabels = await db.TaskLabels.findAll({
      where: {
        taskId: req.params.id,
      },
      include: db.Labels,
    });

    res.status(200).json({
      data: taskLabels.map((tl) => tl.label),
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while removing updating the task labels.'
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
  createTask,
  patchTask,
  deleteTask,
  getTaskComments,
  getTask,
  bulkPatchTaskLabels,
};
