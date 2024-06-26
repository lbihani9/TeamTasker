const { db } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createTaskComment = async (req, res) => {
  try {
    const comment = await db.TaskComments.create({
      ...req.body,
      createdBy: req.user.id,
    });

    const user = await comment.getUser();

    res.status(201).json({
      data: {
        ...comment.toJSON(),
        user: {
          ...user.toJSON(),
        },
      },
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the comment.'
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

const patchTaskComment = async (req, res) => {
  try {
    const { comment = null } = req.body;

    const commentInstance = await db.TaskComments.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: db.Users,
      },
    });

    if (!commentInstance) {
      return res.status(404).json({
        errors: [
          {
            message: 'Comment not found.',
          },
        ],
      });
    }

    if (!comment) {
      return res.status(200).json({
        data: commentInstance,
      });
    }

    await commentInstance.update(req.body);

    res.status(200).json({
      data: commentInstance,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while updating the comment.'
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

const deleteTaskComment = async (req, res) => {
  try {
    const commentInstance = await db.TaskComments.findByPk(req.params.id);
    if (!commentInstance) {
      return res.status(202).json({
        data: null,
      });
    }

    await commentInstance.destroy();

    res.status(202).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while removing label from the task.'
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
  createTaskComment,
  deleteTaskComment,
  patchTaskComment,
};
