'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'Role', {
      type: Sequelize.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'Role');
  }
};

