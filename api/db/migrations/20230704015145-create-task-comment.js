'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taskComments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'users',
        },
      },
      taskId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'tasks',
        },
      },
      comment: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
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
    await queryInterface.dropTable('taskComments');
  },
};
