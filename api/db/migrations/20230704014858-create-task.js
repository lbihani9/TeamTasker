'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['created', 'assigned', 'inProgress', 'done'],
        allowNull: false,
        defaultValue: 'created',
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
    await queryInterface.dropTable('tasks');
  },
};
