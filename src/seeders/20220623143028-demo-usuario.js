"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "usuarios",
            [
                {
                    nome: "Bob Esponja",
                    email: "bobsquare@pants.com",
                    senha: "$2b$12$t5TZG8xSwtrv9n7nc3OqvORWykJa/XWcCCJESAkeOuMTHbgkSJBbi",
                    funcao: "Leitor",
                    pontos: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Coragem",
                    email: "ocao@covarde.com",
                    senha: "$2b$12$t5TZG8xSwtrv9n7nc3OqvORWykJa/XWcCCJESAkeOuMTHbgkSJBbi",
                    funcao: "Basico",
                    pontos: 20,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Patolino da Silva",
                    email: "patolino@looney.com",
                    senha: "$2b$12$t5TZG8xSwtrv9n7nc3OqvORWykJa/XWcCCJESAkeOuMTHbgkSJBbi",
                    funcao: "Avancado",
                    pontos: 100,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "admin",
                    email: "admin@admin.com",
                    senha: "$2b$12$t5TZG8xSwtrv9n7nc3OqvORWykJa/XWcCCJESAkeOuMTHbgkSJBbi",
                    funcao: "Moderador",
                    pontos: 1000,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("usuarios", null, {});
    },
};
