const { db } = require('../db/models/models');

const getUser = async (req, res) => {
  try {
    const user = await db.models.Users.findByPk(req.params.id);
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

const patchUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

const getUsers = async(req, res) => {
  res.status(200).json({
    data: []
  });
}

module.exports = {
  getUser,
  patchUser,
  deleteUser,
  getUsers
};
