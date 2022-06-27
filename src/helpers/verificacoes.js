const database = require("../models");

module.exports = {
    atualizaFuncao: async (autor,pontos) => {
        
        const pontosNecessarios = {
            19: "Basico",
            99: "Avancado",
            999: "Moderador",
        };

        await database.usuarios.update(
            { funcao: pontosNecessarios[pontos] },
            {
                where: {
                    email: autor,
                },
            }
        );
        
    },
};
