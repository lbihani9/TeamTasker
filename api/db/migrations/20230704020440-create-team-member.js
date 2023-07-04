'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teamMembers', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      teamId: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'teams',
        },
      },
      userId: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'users',
        },
      },
      roleId: {
        type: Sequelize.UUID,
        foreignKey: {
          referencedColumnName: 'uuid',
          referencedTable: 'roles',
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
    await queryInterface.dropTable('teamMembers');
  },
};
