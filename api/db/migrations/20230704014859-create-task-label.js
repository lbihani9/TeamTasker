'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taskLabels', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      taskId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'tasks',
        },
        allowNull: true,
      },
      labelId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          referencedColumnName: 'id',
          referencedTable: 'labels',
        },
        allowNull: true,
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
    await queryInterface.dropTable('taskLabels');
  },
};
