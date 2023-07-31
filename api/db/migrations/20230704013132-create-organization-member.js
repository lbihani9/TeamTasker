'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizationMembers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      organizationId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'organizations',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'users',
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'roles',
        },
      },
      hasAccess: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('organizationMembers');
  },
};
