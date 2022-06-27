const database = require("../models");

module.exports = {
    atualizaFuncao: async (autor, pontos) => {
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

    existeComentario: async (id) => {
        if ((await database.filmes.findOne({ where: { id: id } })) == null) {
            throw "Id de comentário inexistente";
        }
    },
    existeUsuario: async usuario =>{
        if((await database.usuarios.findOne({where:{email:usuario}})) == null){
            throw "Usuário não cadastrado"
            
        }
    }
};
