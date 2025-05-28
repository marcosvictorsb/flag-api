'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feature_flags', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING, // Sequelize.ENUM('boolean', 'percentage', 'variant', 'targeted'),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING, //Sequelize.ENUM('enabled', 'disabled'),
        defaultValue: 'disabled'
      },
      rollout: {
        type: Sequelize.INTEGER, // usado para gradual rollout (0 a 100)
        allowNull: true,
        validate: { min: 0, max: 100 }
      },
      variants: {
        type: Sequelize.JSON, // exemplo: [{ name: 'A', weight: 50 }, { name: 'B', weight: 50 }]
        allowNull: true
      },
      targets: {
        type: Sequelize.JSON,
        allowNull: true
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      id_project: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        }
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('feature_flags');
  }
};
