'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teamMembers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      teamId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'teams',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'users',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teamMembers');
  },
};
