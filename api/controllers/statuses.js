const { Sequelize, Op } = require('sequelize');
const { models } = require('../db/models');
const { controllerErrorHandler } = require('../utils/utils');
const { sequelize } = require('../db');

const createStatus = async (req, res) => {
  try {
    const { statusableType, statusableId } = req.body;

    if (!statusableType || statusableType === 'user') {
      req.body.statusableId = req.user.id;
      req.body.statusableType = 'user';
    } else if (!statusableId) {
      return res.status(403).json({
        errors: [
          {
            message:
              'If a status is part of a project, then project id is required.',
          },
        ],
      });
    }

    let status;
    await sequelize.transaction(async (transaction) => {
      let maxOrder = await models.Statuses.max('order', {
        where: {
          statusableType: req.body.statusableType,
          statusableId: req.body.statusableId,
        },
        transaction,
      });

      if (!maxOrder) {
        maxOrder = 0;
      }

      status = await models.Statuses.create(
        {
          ...req.body,
          order: maxOrder + 1,
        },
        { transaction }
      );
    });

    res.status(201).json({
      data: status,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the status.'
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

const patchStatus = async (req, res) => {
  try {
    let { order: newOrder } = req.body;
    let status = await models.Statuses.findOne({
      where: {
        id: req.params.id,
      },
      include: [models.Users, models.Projects],
    });

    if (!status) {
      return res.status(404).json({
        errors: [
          {
            message: 'Status not found.',
          },
        ],
      });
    }

    if (newOrder === null || typeof newOrder === 'undefined') {
      delete req.body.order;
      await status.update(req.body);

      return res.status(200).json({
        data: status,
      });
    }

    if (newOrder === 0) {
      newOrder = 1;
      req.body.order = 1;
    }

    const currentOrder = status.order;
    if (currentOrder === newOrder) {
      return res.status(200).json({
        data: status,
      });
    }

    await sequelize.transaction(async (transaction) => {
      if (newOrder < currentOrder) {
        await models.Statuses.update(
          {
            order: Sequelize.literal('`order` + 1'),
          },
          {
            where: {
              order: {
                [Op.and]: {
                  [Op.gte]: newOrder,
                  [Op.lt]: currentOrder,
                },
              },
              statusableType: status.statusableType,
              statusableId: status.statusableId,
            },
            transaction,
          }
        );
      } else {
        await models.Statuses.update(
          {
            order: Sequelize.literal('`order` - 1'),
          },
          {
            where: {
              order: {
                [Op.and]: {
                  [Op.gt]: currentOrder,
                  [Op.lte]: newOrder,
                },
              },
              statusableType: status.statusableType,
              statusableId: status.statusableId,
            },
            transaction,
          }
        );
      }

      await status.update(req.body, {
        transaction,
      });
    });

    res.status(200).json({
      data: status,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while patching the status.'
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

const deleteStatus = async (req, res) => {
  try {
    const status = await models.Statuses.findByPk(req.params.id);
    if (!status) {
      return res.status(204).json({
        data: null,
      });
    }

    const currentOrder = status.order;

    await sequelize.transaction(async (transaction) => {
      await models.Statuses.update(
        {
          order: Sequelize.literal('`order` - 1'),
        },
        {
          where: {
            order: {
              [Op.gt]: currentOrder,
            },
            statusableType: status.statusableType,
            statusableId: status.statusableId,
          },
          transaction,
        }
      );

      await status.destroy({ transaction, force: true });
    });

    res.status(204).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while deleting the status.'
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
  createStatus,
  patchStatus,
  deleteStatus,
};
