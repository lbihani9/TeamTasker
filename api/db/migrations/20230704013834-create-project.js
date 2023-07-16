'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      teamId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'teams',
        },
      },
      createdBy: {
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
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  },
};
