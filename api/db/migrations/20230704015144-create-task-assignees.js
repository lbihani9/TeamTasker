'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taskAssignees', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      assignee: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'users',
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
    await queryInterface.dropTable('taskAssignees');
  },
};
