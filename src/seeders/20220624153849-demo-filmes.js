"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "filmes",
            [
                {
                    autor: "ocao@covarde.com",
                    imdbID: "tt3896198",
                    titulo: "Guardians of the Galaxy Vol. 2",
                    comentario: "Muito Legal",
                   
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    autor: "bobsquare@pants.com",
                    imdbID: "tt3896198",
                    titulo: "Guardians of the Galaxy Vol. 2",
                    comentario: "Muito Bom",
                    
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
