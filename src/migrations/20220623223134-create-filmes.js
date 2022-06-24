'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('filmes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      autor:{
        allowNull: false,
        type: Sequelize.STRING,
        references:{model: 'usuarios', key: 'email'}
      },
      imdbID:{
        allowNull: false,
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comentario: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('filmes');
  }
};