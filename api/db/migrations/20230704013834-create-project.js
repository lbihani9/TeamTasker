'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'teams',
        },
      },
      createdBy: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
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
