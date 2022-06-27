'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respostas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idComentario:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "filmes", key: "id" }
      },
      resposta: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{model: 'usuarios', key: 'email'}
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
    await queryInterface.dropTable('respostas');
  }
};