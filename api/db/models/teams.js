const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Teams = sequelize.define('teams', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  organizationId: {
    type: DataTypes.INTEGER,
    references: {
      key: 'id',
      model: 'organizations',
    },
    allowNull: false,
  },
});

module.exports = {
  Teams,
};
