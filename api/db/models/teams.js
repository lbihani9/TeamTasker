const { DataTypes } = require('sequelize');
const { sequelize } = require('..');

const Teams = sequelize.define('teams', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  organizationId: {
    type: DataTypes.UUID,
    foreignKey: {
      referencedColumnName: 'uuid',
      referencedTable: 'organizations',
    },
    allowNull: false,
  },
});

module.exports = {
  Teams,
};
