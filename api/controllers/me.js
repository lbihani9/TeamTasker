const { sequelize } = require('../db');
const { db } = require('../db/models');
const { Projects, Tasks, Organizations, Roles, Users } = db.models;

const getMyOrganizations = async (req, res) => {
  try {
    const { user } = req;
    // TODO (Lokesh): Add a scope in model to fetch all the organizations a user is member of.
    const organizations = await Organizations.findAll({
      include: [
        {
          model: Users,
          where: {
            id: user.id,
          },
          attributes: [],
        },
      ],
    });

    res.status(200).json({
      data: {
        organizations,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching your organizations.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const getMyTasks = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = typeof limit === 'undefined' ? 50 : min(max(1, Number(limit)), 50);
    offset = typeof offset === 'undefined' ? 0 : Number(offset);

    const tasks = await req.user.getTasks({ joinTableAttributes: [] });

    res.status(200).json({
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching your tasks.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const getMyProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      where: {
        teamId: null,
      },
    });

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
          message: 'An error occured while fetching your projects.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const createMyOrganization = async (req, res) => {
  try {
    const organization = await sequelize.transaction(async (t) => {
      const organization = await Organizations.create(
        {
          ...req.body,
          ownedBy: req.user.id,
        },
        { transaction: t }
      );

      const role = await Roles.findOne({ where: { name: 'admin' } });
      await organization.addUser(req.user, {
        through: {
          roleId: role.id,
        },
        transaction: t,
      });

      return organization;
    });

    res.status(201).json({
      data: {
        organization,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while creating your organization.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const createMyProject = async (req, res) => {
  try {
    const project = await Projects.create({
      ...req.body,
      createdBy: req.user.id,
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
          message: 'An error occured while creating your project.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const createMyTask = async (req, res) => {
  try {
    const task = await sequelize.transaction(async (t) => {
      const task = await Tasks.create({
        ...req.body,
        createdBy: req.user.id,
      });

      await task.addUser(req.user);
      return task;
    });

    res.status(201).json({
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while creating your task.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

module.exports = {
  getMyOrganizations,
  getMyTasks,
  getMyProjects,
  createMyOrganization,
  createMyProject,
  createMyTask,
};
