const { db } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createTaskAssignee = async (req, res) => {
  try {
    const { userIds = [] } = req.body;
    if (!Array.isArray(userIds)) {
      return res.status(400).json({
        errors: [
          {
            message: 'An array of user ids is expected.',
          },
        ],
      });
    }

    if (userIds.length === 0) {
      return res.status(400).json({
        errors: [
          {
            message: 'Atleast one assignee is required.',
          },
        ],
      });
    }

    let assignee;
    if (userIds.length === 1) {
      assignee = await db.TaskAssignees.create({
        taskId: req.body.taskId,
        userId: userIds[0],
      });
    } else {
      const uniqueUserIds = new Set(userIds.map((uid) => uid));
      assignee = await db.TaskAssignees.bulkCreate(
        [...uniqueUserIds].map((uid) => ({
          taskId: req.body.taskId,
          userId: uid,
        }))
      );
    }

    res.status(201).json({
      data: assignee,
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(403).json({
        errors: [
          {
            message:
              'Please only select the users to whom the task is not yet assigned.',
          },
        ],
      });
    } else {
      res.status(500).json({
        errors: [
          {
            message: 'An error occured while adding task assignee(s).',
          },
        ],
      });
    }
  }
};

const deleteTaskAssignee = async (req, res) => {
  try {
    await db.TaskAssignees.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while removing assignee from the task.'
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
  createTaskAssignee,
  deleteTaskAssignee,
};
