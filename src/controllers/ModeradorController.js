const database = require("../models");

class ModeradorController {
    static async darMod(req, res) {
        try {
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
            await database.filmes.destroy({ where: { id: req.params.id } });
            return res
                .status(200)
                .send(`O comentário ${req.params.id} foi deletados`);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async marcarRepetido(req,res){
        try {
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
