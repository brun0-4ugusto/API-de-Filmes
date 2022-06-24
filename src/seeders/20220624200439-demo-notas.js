'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "notas",
      [
          {
              autor: "ocao@covarde.com",
              imdbID: "tt3896198",
              titulo: "Guardians of the Galaxy Vol. 2",
              nota: 4,
             
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          {
              autor: "bobsquare@pants.com",
              imdbID: "tt3896198",
              titulo: "Guardians of the Galaxy Vol. 2",
              nota: 2,
              
              createdAt: new Date(),
              updatedAt: new Date(),
          },
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
