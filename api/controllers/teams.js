const { sequelize } = require('../db');
const { db } = require('../db/models');
const { Teams, Users, OrganizationMembers, Roles, Projects } = db.models;

const getTeamProjects = async (req, res) => {
  try {
    const team = await Teams.findByPk(req.params.id, {
      include: {
        model: Projects,
        as: 'TeamProjects'
      }
    });

    if (!team) {
      return res.status(400).json({
        errors: [
          {
            message: "This team doesn't exist",
          },
        ],
      });
    }

    const projects = team.TeamProjects;
    res.status(200).json({
      data: {
        projects,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: "An error occured while fetching team's projects.",
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const getTeamMembers = async (req, res) => {
  try {
    const members = await Users.findAll({
      include: [
        {
          model: Teams,
          where: {
            id: req.params.id,
          },
          attributes: [],
        },
      ],
    });

    res.status(200).json({
      data: {
        members,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: "An error occured while fetching team's members.",
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const addTeamMember = async (req, res) => {
  try {
    const team = await Teams.findByPk(req.params.id);
    if (!team) {
      return res.status(400).json({
        errors: [
          {
            message: "This team doesn't exist",
          },
        ],
      });
    }

    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });

    // TODO (Lokesh): Send an invitation email and create the user if it doesn't exist.
    if (!user) {
      return res.status(403).json({
        errors: [
          {
            message: "The user must have an account with 'TeamTasker'.",
          },
        ],
      });
    }

    const organizationMember = await OrganizationMembers.findOne({
      where: {
        organizationId: team.organizationId,
        userId: user.id,
      },
    });

    if (organizationMember) {
      // TODO (Lokesh): Use a `findOrCreate` kinda functionality.
      const member = await team.addUser(user, {
        through: {
          roleId: organizationMember.roleId,
        },
      });
      return res.status(201).json({
        data: {
          member,
        },
      });
    }

    const member = await sequelize.transaction(async (t) => {
      const role = await Roles.findOne({ where: { name: 'member' } });

      const organization = await team.getOrganization();
      await organization.addUser(user, { through: { roleId: role.id } });

      const member = await team.addUser(user, { through: { roleId: role.id } });
      return member;
    });

    res.status(201).json({
      data: {
        member,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while adding new member to the team.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const createTeamProject = async (req, res) => {
  try {
    const team = await Teams.findByPk(req.params.id);
    if (!team) {
      return res.status(400).json({
        errors: [
          {
            message: "This team doesn't exist",
          },
        ],
      });
    }

    const project = await Projects.create({
      ...req.body,
      teamId: team.id,
      createdBy: req.user.id
    });

    res.status(201).json({
      data: {
        project,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: "An error occured while creating team's new project.",
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

module.exports = {
  getTeamProjects,
  getTeamMembers,
  addTeamMember,
  createTeamProject,
};
