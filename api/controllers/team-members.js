const { db, sequelize } = require('../services/database');
const { controllerErrorHandler } = require('../utils/utils');

const createTeamMember = async (req, res) => {
  try {
    const { email = null, teamId = null } = req.body;
    if (!teamId) {
      return res.status(400).json({
        errors: [
          {
            message: 'Team id is required.',
          },
        ],
      });
    }

    if (!email) {
      return res.status(400).json({
        errors: [
          {
            message: 'Email is required.',
          },
        ],
      });
    }

    const team = await db.Teams.findOne({
      where: {
        id: teamId,
      },
      include: db.Organizations,
    });

    if (!team) {
      return res.status(404).json({
        errors: [
          {
            message: "Team doesn't exist.",
          },
        ],
      });
    }

    let teamMember;
    const user = await db.Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            message: 'Please ensure that the user has a valid account.',
          },
        ],
      });
    }

    await sequelize.transaction(async (transaction) => {
      teamMember = await db.TeamMembers.create(
        {
          teamId,
          userId: user.id,
        },
        { transaction }
      );

      await db.OrganizationMembers.create(
        {
          organizationId: team.organization.id,
          userId: user.id,
        },
        { transaction }
      );
    });

    res.status(201).json({
      data: teamMember,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(
      error,
      'An error occured while adding the team member.'
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

const deleteTeamMember = async (req, res) => {
  try {
    await db.TeamMembers.destory({
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
      'An error occured while deleting the team member.'
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
  createTeamMember,
  deleteTeamMember,
};
