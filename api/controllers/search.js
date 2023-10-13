const { Op } = require('sequelize');
const { models } = require('../db/models');

const getProjectActionItems = async (req, res) => {
  try {
    const { text = null, fields } = req.query;
    const attributes = fields.split(',');

    const dbQuery = {
      attributes,
      where: {
        projectableType: 'user',
        projectableId: req.user.id,
      },
    };

    if (text) {
      dbQuery.where.name = {
        [Op.substring]: text,
      };
    }

    const projects = await models.Projects.findAll(dbQuery);

    res.status(200).json({
      data: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while searching for projects.',
        },
      ],
    });
  }
};

const getLabelActionItems = async (req, res) => {
  try {
    const { taskId, text = null, fields = null } = req.query;

    const task = await models.Tasks.findOne({
      where: {
        id: taskId,
      },
      include: {
        model: models.Labels,
        attributes: ['id'],
      },
    });

    if (task === null) {
      return res.status(200).json({
        data: [],
      });
    }

    const dbQuery = {
      where: {
        id: {
          [Op.notIn]: task.labels.map((l) => l.id),
        },
      },
    };

    if (fields) {
      dbQuery.attributes = fields.split(',');
    }

    if (task.taskableType === 'user') {
      dbQuery.where.labelableType = 'user';
    } else {
      dbQuery.where.labelableType = 'team';
    }

    if (text && text !== '') {
      dbQuery.where.name = {
        [Op.substring]: text,
      };
    }

    const labels = await models.Labels.findAll(dbQuery);
    res.status(200).json({
      data: labels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while searching for labels.',
        },
      ],
    });
  }
};

module.exports = {
  getProjectActionItems,
  getLabelActionItems,
};
