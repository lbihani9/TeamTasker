const { db, sequelize } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createLabel = async (req, res) => {
  try {
    let { labelableType, labelableId } = req.body;

    if (!labelableType || labelableType === 'user') {
      req.body.labelableId = req.user.id;
      req.body.labelableType = 'user';
    } else if (!labelableId) {
      return res.status(403).json({
        errors: [
          {
            message:
              'If a label is part of a team in an organization, then team id is required.',
          },
        ],
      });
    }

    let label = await db.Labels.create(req.body);
    label = await db.Labels.findOne({
      where: {
        id: label.id,
      },
      include: [db.Users, db.Teams],
    });

    res.status(201).json({
      data: label,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the label.'
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

const patchLabel = async (req, res) => {
  try {
    delete req.body.labelableType;
    delete req.body.labelableId;

    const label = await db.Labels.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Users, db.Teams],
    });

    if (!label) {
      return res.status(404).json({
        errors: [
          {
            message: 'Label not found.',
          },
        ],
      });
    }

    await label.update(req.body);

    res.status(200).json({
      data: label,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while updating the label.'
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

const deleteLabel = async (req, res) => {
  try {
    const label = await db.Labels.findByPk(req.params.id);
    if (!label) {
      return res.status(200).json({
        data: null,
      });
    }

    await sequelize.transaction(async (transaction) => {
      await db.TaskLabels.destroy({
        where: {
          labelId: label.id,
        },
        transaction,
      });

      await label.destroy({ transaction });
    });

    res.status(200).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while deleting the label.'
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
  createLabel,
  patchLabel,
  deleteLabel,
};
