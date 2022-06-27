const { existeUsuario, existeComentario } = require("../helpers/verificacoes");
const database = require("../models");

class ModeradorController {
    static async darMod(req, res) {
        try {
            await existeUsuario(req.body.email)
            await database.usuarios.update(
                {
                    funcao: "Moderador",
                },
                { where: { email: req.body.email } }
            );
            return res
                .status(200)
                .send(`${req.body.email} foi incluído como Moderador`);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async excluirComentario(req, res) {
        try {
            await existeComentario(req.params.id)
            await database.respostas.destroy({where:{idComentario:req.params.id}})
            await database.filmes.destroy({ where: { id: req.params.id } });
            return res
                .status(200)
                .send(`O comentário ${req.params.id} foi deletado`);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async marcarRepetido(req,res){
        try {
            await existeComentario(req.params.id)
            await database.filmes.update({repetido:1},{where:{id:req.params.id}})
            return res
            .status(200)
            .send(`O comentário ${req.params.id} foi marcado como repetido`);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = ModeradorController;
