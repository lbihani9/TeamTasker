'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projectTasks', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      projectId: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'projects',
        },
      },
      taskId: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'tasks',
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
    await queryInterface.dropTable('projectTasks');
  },
};
