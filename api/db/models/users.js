const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = {
  Users
}
