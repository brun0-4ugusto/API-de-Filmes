const LeitorController = require("./LeitorController");
const database = require("../models");

class BasicoController {
    static async postarComentario(req, res) {
        try {
            const buscaFilmes = await LeitorController._buscarFilmesApi(
                "",
                req.query.id
            );
            const tituloFilme = buscaFilmes.data.Title;

            const comentario = await database.filmes.create({
                titulo: tituloFilme,
                comentario: req.body.comentario,
                imdbID: req.query.id,
                autor: req.user.dataValues.email,
            });

            
            await LeitorController._atualizaPonto(req.user.dataValues.email);

            return res.status(200).json({
                message: comentario,
            });
        } catch (error) {
            if(error.parent.errno == 1364){
                return res.status(400).send("Filme não encontrado verifique o imdbID");
            }
            if(error.parent.errno == 1452){
                return res.status(400).send("Parâmetros enviados errados");
            }
            return res.status(500).send(error);
        }
    }

    static async responderComentario(req, res) {
        try {
            const resposta = await database.respostas.create({
                idComentario: Number(req.params.id),
                resposta: req.body.resposta,
                autor: req.user.dataValues.email,
            });
            
            await LeitorController._atualizaPonto(req.user.dataValues.email);
            return res.status(200).json({
                message: resposta,
            });
        } catch (error) {
            if(error.parent.errno == 1452){
                return res.status(400).send("Parâmetros enviados errados");
            }
            return res.status(500).send(error);
        }
    }

    static async verTodasRespostas(req,res){
        try {
            const respostas = await database.respostas.findAll({
                where: { idComentario: req.params.id },
                attributes: ["resposta"],
            });
            let todasRespostas = respostas.map(element=>{
                return (element.resposta)
            })
            return res.status(200).json({"Todas as respostas":todasRespostas})
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = BasicoController;
