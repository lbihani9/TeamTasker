const { db } = require('../db/models');
const { Projects } = db.models;

const updateProject = async (req, res) => {
  try {
    const project = await Projects.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!project) {
      return res.status(400).json({
        errors: [
          {
            message: "Project doesn't exist",
          },
        ],
      });
    }

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

const createProjectTask = async (req, res) => {
  try {
    const project = await Projects.findByPk(req.params.id);
    if (!project) {
      return res.status(400).json({
        errors: [
          {
            message: "Project doesn't exist",
          },
        ],
      });
    }

    const task = await project.createTask({
      ...req.body,
      createdBy: req.user.id,
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
          message: 'An error occured while creating the task.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const getProjectTasks = async (req, res) => {
  try {
    const project = await Projects.findByPk(req.params.id);
    if (!project) {
      return res.status(400).json({
        errors: [
          {
            message: "Project doesn't exist",
          },
        ],
      });
    }

    const tasks = await project.getTasks();
    res.status(200).json({
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching project tasks.',
        },
        {
          message: err.message,
        },
      ],
    });
  }
};

module.exports = {
  updateProject,
  createProjectTask,
  getProjectTasks,
};
