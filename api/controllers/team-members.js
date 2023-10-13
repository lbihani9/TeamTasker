const { models } = require('../db/models');

const createTeamMember = async (req, res) => {
  try {
    const { users = [], teamId = null } = req.body;
    if (!teamId) {
      return res.status(400).json({
        errors: [
          {
            message: 'Team id is required.',
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

    let teamMember;
    if (users.length === 1) {
      teamMember = await models.TeamMembers.create({
        teamId,
        userId: users[0].id,
      });
    } else {
      teamMember = await models.TeamMembers.bulkCreate(
        users.map((user) => ({ teamId, userId: user.id }))
      );
    }

    res.status(201).json({
      data: teamMember,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while adding the team member.',
        },
      ],
    });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    await models.TeamMembers.destory({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      data: null,
    });
  } catch (error) {
    const { statusCode, message } = controllerErrorHandler(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while deleting the team member.',
        },
      ],
    });
  }
};

module.exports = {
  createTeamMember,
  deleteTeamMember,
};
