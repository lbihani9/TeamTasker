const { db } = require('../db/models');
const { Projects } = db.models;

const createProject = async (req, res) => {
  try {
    req.body.createdBy = req.session.userId;
    if (typeof req.team !== undefined) {
      req.body.teamId = req.team.id;
    }

    const project = await Projects.create(req.body);
    res.status(201).json({
      data: {
        project,
      },
    });
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

const updateProject = async (req, res) => {
  try {
    const project = await Projects.findOne({
      where: {
        id: req.params.id,
      },
    });

    await project.update(req.body);
    res.status(200).json({
      data: {
        project,
      },
    });
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

const getProjects = async (req, res) => {
  try {
    const queryObject = {};
    if (typeof req.team !== undefined) {
      queryObject.teamId = req.team.id;
    } else {
      queryObject.createdBy = req.session.userId;
    }

    const projects = await Projects.findAll({
      where: queryObject,
    });

    res.status(200).json({
      data: {
        projects,
      },
    });
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
  createProject,
  updateProject,
  getProjects,
};
