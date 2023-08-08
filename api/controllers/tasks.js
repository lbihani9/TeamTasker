const { db } = require('../db/models');
const { Tasks, Users } = db.models;

const addTaskAssignee = async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (!task) {
      return res.status(400).json({
        errors: [
          {
            message: "Task doesn't exist",
          },
        ],
      });
    }

    const { username } = req.body;
    const user = await Users.findOne({ where: { username } });

    // TODO (Lokesh): Use findOrCreate kinda functionality with mixins.
    const assignee = await task.addUser(user);
    res.status(201).json({
      data: {
        assignee,
      },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while creating the task.',
        },
        {
          message: err.message,
        },
      ],
    });
  }
};

module.exports = {
  addTaskAssignee,
};
