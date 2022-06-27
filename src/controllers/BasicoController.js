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
                autor: req.body.autor,
            });

            
            await LeitorController._atualizaPonto(req.body.autor);

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
                autor: req.body.autor,
            });
            
            await LeitorController._atualizaPonto(req.body.autor);
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
}

module.exports = BasicoController;
