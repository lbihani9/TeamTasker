const { db } = require('../db/models');
const { Users, Organizations } = db.models;

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Users.findOne({
      where: {
        username,
      },
    });

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching user details.',
        },
      ],
    });
  }
};

const patchUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Users.findOne({
      where: {
        username,
      },
    });

    if (user) {
      await user.update(req.body);
    }

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
      res.status(403).json({
        errors: [
          {
            message: err.message,
          },
        ],
      });
      return;
    }
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while updating user details.',
        },
      ],
    });
  }
};

const getUsers = async (req, res) => {
  res.status(200).json({
    data: [],
  });
};

/**
 * @returns all the organizations the user is associated with.
 */  
const getUserOrganizations = async (req, res) => {
  try {
    const { email } = req.session.cookie;
    const user = await Users.findOne({ 
      where: {
        email
      }
    });

    // const organizations = await Organizations.findAll({
    //   where: {
        
    //   }
    // })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: 'An error occured while fetching associated organizations.',
        },
      ],
    });
  }
}

module.exports = {
  getUser,
  patchUser,
  getUsers,
  getUserOrganizations
};
