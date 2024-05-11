const { Op } = require('sequelize');
const { db } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createTaskLabel = async (req, res) => {
  try {
    const { labelId } = req.body;

    await db.TaskLabels.create({
      taskId: req.body.taskId,
      labelId,
    });

    const label = await db.Labels.findByPk(labelId);

    res.status(201).json({
      data: label,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while adding label(s) to the task.'
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

const deleteTaskLabel = async (req, res) => {
  try {
    await db.TaskLabels.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    });

    res.status(200).json({
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
  createTaskLabel,
  deleteTaskLabel,
};
