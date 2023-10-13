const { models } = require('../db/models');
const { controllerErrorHandler } = require('../utils/utils');

const createOrganizationMember = async (req, res) => {
  try {
    const { users = [], organizationId = null } = req.body;
    if (!organizationId) {
      return res.status(400).json({
        errors: [
          {
            message: 'Organization id is required.',
          },
        ],
      });
    }

    if (users.length === 0) {
      return res.status(400).json({
        errors: [
          {
            message: 'Atleast one user is required.',
          },
        ],
      });
    }

    let organizationMember;
    if (users.length === 1) {
      organizationMember = await models.OrganizationMembers.create({
        organizationId,
        userId: users[0].id,
      });
    } else {
      organizationMember = await models.OrganizationMembers.bulkCreate(
        users.map((user) => ({ organizationId, userId: user.id }))
      );
    }

    res.status(201).json({
      data: organizationMember,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while adding the user to the organization.'
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

const deleteOrganizationMember = async (req, res) => {
  try {
    const member = await models.OrganizationMembers.findByPk(req.params.id);

    await sequelize.transaction(async (transaction) => {
      await models.TeamMembers.destroy({
        where: {
          userId: member.userId,
          organizationId: member.organizationId,
        },
        transaction,
      });

      // TODO: Remove TaskAssignees as well.

      await member.destroy({ transaction });
    });

    res.status(200).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while removing the user from the organization.'
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
  createOrganizationMember,
  deleteOrganizationMember,
};
