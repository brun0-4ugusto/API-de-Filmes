"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("notas", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            autor: {
                allowNull: false,
                type: Sequelize.STRING,
                references: { model: "usuarios", key: "email" },
                
            },
            nota: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            imdbID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("notas");
    },
};
