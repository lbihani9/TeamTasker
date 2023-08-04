const { db } = require('../db/models');
const { Projects } = db.models;

const createProject = async (req, res) => {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while creating the project.',
        },
        {
          message: err.message,
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
          message: 'An error occured while updating the project.',
        },
        {
          message: err.message,
        },
      ],
    });
  }
};

module.exports = {
  createProject,
  updateProject,
};
