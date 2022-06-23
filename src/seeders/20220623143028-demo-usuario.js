"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "usuarios",
            [
                {
                    nome: "Bob Esponja",
                    email: "bobsquare@pants.com",
                    senha: "1234",
                    funcao: "Leitor",
                    pontos: "0",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Coragem",
                    email: "ocao@covarde.com",
                    senha: "1234",
                    funcao: "Basico",
                    pontos: "21",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Patolino da Silva",
                    email: "patolino@looney.com",
                    senha: "1234",
                    funcao: "Avancado",
                    pontos: "100",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "admin",
                    email: "admin@admin.com",
                    senha: "1234",
                    funcao: "Moderador",
                    pontos: "1000",
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
