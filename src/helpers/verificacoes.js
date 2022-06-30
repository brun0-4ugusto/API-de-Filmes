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
    existeUsuario: async (usuario) => {
        if ((await database.usuarios.findOne({ where: { email: usuario } })) == null) {
            throw "Usuário não cadastrado";
        }
    },
    gostou: async (gostou, id) => {
        if (gostou == "true") {
            await database.filmes.update({ gostei: 1 }, { where: { id: id } });
        } else if (gostou == "false") {
            await database.filmes.update({ naoGostei: 1 }, { where: { id: id } });
        } else {
            throw "Parâmetro Errado";
        }
    },
    jaGostou: async (curtidas, votante) => {
        const pattern = new RegExp(`${votante}`);
        pattern.test(curtidas);
        if (pattern.test(curtidas)) {
            throw "Você já reagiu a esse filme";
        }
    },
};
