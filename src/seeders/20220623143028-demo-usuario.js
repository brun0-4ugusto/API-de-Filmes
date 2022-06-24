"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "usuarios",
            [
                {
                    nome: "Bob Esponja",
                    email: "bobsquare@pants.com",
                    senha: "$2b$12$jHtV4bfWCK8kljwpeLCr8.F.farpa6ahnQ4SpG0vsAuO4NuxEjv2e",
                    funcao: "Leitor",
                    pontos: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Coragem",
                    email: "ocao@covarde.com",
                    senha: "$2b$12$jHtV4bfWCK8kljwpeLCr8.F.farpa6ahnQ4SpG0vsAuO4NuxEjv2e",
                    funcao: "Basico",
                    pontos: 20,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Patolino da Silva",
                    email: "patolino@looney.com",
                    senha: "$2b$12$jHtV4bfWCK8kljwpeLCr8.F.farpa6ahnQ4SpG0vsAuO4NuxEjv2e",
                    funcao: "Avancado",
                    pontos: 100,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "admin",
                    email: "admin@admin.com",
                    senha: "$2b$12$jHtV4bfWCK8kljwpeLCr8.F.farpa6ahnQ4SpG0vsAuO4NuxEjv2e",
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
