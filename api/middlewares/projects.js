const { db } = require('../db/models');
const { Team } = db.models;

const validateProjects = async (req, res, next) => {
  try {
    const xUserId = req.headers['X-User-Id'];
    const xOrganizationId = req.headers['X-Organization-Id'];
    const xTeamId = req.headers['X-Team-Id'];

    if (typeof xUserId !== undefined) {
      if (xUserId !== req.session.userId) {
        return res.status(403).json({
          errors: [
            {
              message: 'Incorrect header parameters.',
            },
          ],
        });
      }
    } else if (
      typeof xOrganizationId === undefined ||
      typeof xTeamId === undefined
    ) {
      return res.status(400).json({
        errors: [
          {
            message: 'Missing header parameters.',
          },
        ],
      });
    } else {
      const team = await Team.findOne({
        where: {
          id: xTeamId,
        },
      });

      if (team === null || team.organizationId !== xOrganizationId) {
        return res.status(400).json({
          errors: [
            {
              message: 'Incorrect header parameters.',
            },
          ],
        });
      }

      req.team = team;
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An internal server error occured.',
        },
      ],
    });
  }
};

module.exports = {
  validateProjects,
};
