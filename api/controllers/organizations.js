const { sequelize } = require('../db');
const { db } = require('../db/models');
const { Organizations, Teams } = db.models;

const getOrganizationTeams = async (req, res) => {
  try {
    const organization = await Organizations.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!organization) {
      return res.status(200).json({
        data: {
          teams: [],
        },
      });
    }

    const teams = await organization.getTeams();
    res.status(200).json({
      data: {
        teams,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message:
            'An error occured while fetching the teams of this organization.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const createOrganzationTeam = async (req, res) => {
  try {
    const organization = await Organizations.findByPk(req.params.id);
    if (!organization) {
      return res.status(400).json({
        errors: [
          {
            message: "Organization doesn't exist.",
          },
        ],
      });
    }

    const team = await organization.createTeam({ ...req.body });
    res.status(201).json({
      data: {
        team,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while creating the team.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

module.exports = {
  getOrganizationTeams,
  createOrganzationTeam,
};
