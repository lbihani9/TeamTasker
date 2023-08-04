const { db } = require('../db/models');
const { Tasks, TaskAssignees } = db.models;

const createTask = async (req, res) => {
  try {
    const task = await Tasks.create({
      ...req.body,
      createdBy: req.user.id,
    });

    await task.addUser(req.user);

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

module.exports = {
  createTask,
};
