const { sequelize } = require('../db');
const { models } = require('../db/models');
const { controllerErrorHandler } = require('../utils/utils');

// TODO: Remove Hardcoding

const createOrganization = async (req, res) => {
  try {
    let organization;
    await sequelize.transaction(async (transaction) => {
      organization = await models.Organizations.create(
        {
          ...req.body,
          ownedBy: 1,
        },
        { transaction }
      );

      await models.OrganizationMembers.create(
        {
          organizationId: organization.id,
          userId: 1,
        },
        { transaction }
      );
    });

    res.status(201).json({
      data: organization,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while creating the organization.'
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

const patchOrganization = async (req, res) => {
  try {
    delete req.body.username;

    const organization = await models.Organizations.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      data: organization,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while updating the organization.'
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

const getOrganizationTeams = async (req, res) => {
  try {
    const teams = await models.Teams.findAll({
      where: {
        organizationId: req.params.id,
      },
    });

    res.status(200).json({
      data: teams,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching the teams.'
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

const getOrganizationMembers = async (req, res) => {
  try {
    const { organizationSlug } = req.params;
    const members = await models.OrganizationMembers.findAll({
      include: [
        {
          model: models.Organizations,
          where: {
            username: organizationSlug,
          },
          attributes: [],
        },
        {
          model: models.Users,
        },
      ],
    });

    res.status(200).json({
      data: members,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while fetching the members of this organization.'
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
  createOrganization,
  patchOrganization,
  getOrganizationTeams,
  getOrganizationMembers,
};
