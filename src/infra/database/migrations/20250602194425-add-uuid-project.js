'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'projects',
      'uuid',
      {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        after: 'description' // adiciona após a coluna 'description' e antes de 'id_user'
      }
    );
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('projects', 'uuid');
  }
};
