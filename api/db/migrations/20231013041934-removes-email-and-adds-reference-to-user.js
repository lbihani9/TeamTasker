'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('sessions', 'email');

    await queryInterface.addColumn('sessions', 'userId', {
      type: Sequelize.INTEGER,
      foreignKey: {
        referencedColumnName: 'id',
        referencedTable: 'users',
      },
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('sessions', 'userId');

    await queryInterface.addColumn('sessions', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
