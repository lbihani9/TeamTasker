const { Op } = require('sequelize');
const { models } = require('../db/models');
const { controllerErrorHandler } = require('../utils/utils');
const { sequelize } = require('../db');

const createTeam = async (req, res) => {
  try {
    let team;
    await sequelize.transaction(async (transaction) => {
      team = await models.Teams.create(req.body, { transaction });

      await models.TeamMembers.create({
        teamId: team.id,
        userId: req.user.id,
      });
    });

    res.status(201).json({
      data: team,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occurred while creating the team.'
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

const patchTeam = async (req, res) => {
  try {
    const team = await models.Teams.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      data: team,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occurred while updating the team.'
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

const getTeamProjects = async (req, res) => {
  try {
    const { text = null } = req.query;
    const dbQuery = {
      where: {
        projectableType: 'team',
        projectableId: req.params.id,
      },
      include: {
        model: models.Users,
        as: 'projectAuthor',
      },
    };

    if (text && text !== '') {
      dbQuery.where.name = {
        [Op.substring]: text,
      };
    }

    const projects = await models.Projects.findAll(dbQuery);

    res.status(200).json({
      data: projects,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching team Projects.'
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

const getTeamLabels = async (req, res) => {
  try {
    const { text = null } = req.query;
    const dbQuery = {
      where: {
        labelableType: 'team',
        labelableId: req.params.id,
      },
    };

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
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching team Labels.'
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

const getTeamMembers = async (req, res) => {
  try {
    const { rows: members, count: total } =
      await models.TeamMembers.findAndCountAll({
        where: {
          teamId: req.params.id,
        },
        include: {
          model: models.Users,
        },
        order: [['createdAt', 'ASC']],
      });

    res.status(200).json({
      data: members,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching team Members.'
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
  createTeam,
  patchTeam,
  getTeamProjects,
  getTeamLabels,
  getTeamMembers,
};
