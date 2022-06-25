const database = require("../models");
const axios = require("axios");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

class LeitorController {
    static async #buscarFilmesApi(titulo, imdbID, search) {
        const resp = await axios.get(`https://www.omdbapi.com/`, {
            params: {
                t: titulo,
                i: imdbID,
                s: search,
                apikey: "cee96c18",
            },
        });

        return resp;
    }

    static async #filmesInteraçoes(titulo = "", imdbID = null) {
        const comentarios = await database.filmes.findAll({
            where: { [Op.or]: { imdbID: imdbID, titulo: titulo } },
            attributes: { exclude: ["imdbID"] },
        });

        const notas = await database.notas.findAll({
            where: { [Op.or]: { imdbID: imdbID, titulo: titulo } },
            attributes: { exclude: ["imdbID"] },
        });

        return { comentarios: comentarios, notas: notas };
    }

    static async buscarFilmes(req, res) {
        try {
            const resp = await LeitorController.#buscarFilmesApi(
                req.query.titulo,
                req.query.id,
                req.query.search
            );
            const interacoes = await LeitorController.#filmesInteraçoes(
                req.query.titulo,
                req.query.id
            );
            return res.status(resp.status).json({
                info: resp.data,
                interações: interacoes,
            });
        } catch (err) {
            return res.status(500).send();
        }
    }

    static async #atualizaPonto(autor) {
        try {
            const pontuaçaoLinha = await database.usuarios.findAll({
                where: { email: autor },
                attributes: ["pontos"],
            });
            
            let pontos = Number(pontuaçaoLinha[0].dataValues.pontos);
            if(pontos == 19){
                await database.usuarios.update({funcao:"Basico"},{where:{
                    email: autor
                }})
            }
            pontos += 1;

            await database.usuarios.update(
                { pontos: pontos },
                {
                    where: { email: autor },
                }
            );
        } catch (error) {}
    }

    static async darNota(req, res) {
        try {
            const buscaFilmes = await LeitorController.#buscarFilmesApi(
                "",
                req.query.id
            );
            const tituloFilme = buscaFilmes.data.Title;

            const jaAvaliou = await database.notas.findOne({
                where: {
                    imdbID: req.query.id,
                    autor:req.body.autor
                },
            });

            if (jaAvaliou == undefined) {
                const nota = await database.notas.create({
                    titulo: tituloFilme,
                    nota: req.body.nota,
                    imdbID: req.query.id,
                    autor: req.body.autor,
                });
                await LeitorController.#atualizaPonto(req.body.autor);
                return res.status(200).json({
                    message: nota,
                });
            } else {
                return res.status(400).send("Nota ja foi adicionada");
            }
        } catch (err) {
            return res.status(500).send();
        }
    }
}

module.exports = LeitorController;
