'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "respostas",
      [
          {
            idComentario: 1,
              resposta: "Não achei tão legal",
              autor: "patolino@looney.com",
             
             
              createdAt: new Date(),
              updatedAt: new Date(),
          }
      ],
      {}
  );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
