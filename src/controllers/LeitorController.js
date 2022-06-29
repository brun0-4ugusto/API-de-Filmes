const database = require("../models");
const axios = require("axios");
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const verificaCargo = require("../helpers/verificacoes");

class LeitorController {
    static async _buscarFilmesApi(titulo, imdbID, search) {
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

    static async _filmesInteraçoes(titulo = "", imdbID = null) {
        const comentarios = await database.filmes.findAll({
            where: { [Op.or]: { imdbID: imdbID, titulo: titulo } },
            attributes: { exclude: ["imdbID"] },
        });

        const notas = await database.notas.findAll({
            where: { [Op.or]: { imdbID: imdbID, titulo: titulo } },
            attributes: { exclude: ["imdbID"] },
        });
        if (comentarios.length == 0 && notas.length == 0) {
            return "Especifique o filme com o imdbID ou título";
        }
        return { comentarios: comentarios, notas: notas };
    }

    static async buscarInteracoes(req, res) {
        try {
            const resp = await LeitorController._buscarFilmesApi(
                req.query.titulo,
                req.query.id,
                req.query.search
            );
            const interacoes = await LeitorController._filmesInteraçoes(
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

    static async _atualizaPonto(autor) {
        try {
            const pontuaçaoLinha = await database.usuarios.findAll({
                where: { email: autor },
                attributes: ["pontos"],
            });

            let pontos = Number(pontuaçaoLinha[0].dataValues.pontos);
            if (pontos == 19 || pontos == 99 || pontos == 999) {
                verificaCargo.atualizaFuncao(autor, pontos);
            }
            pontos += 1;

            await database.usuarios.update(
                { pontos: pontos },
                {
                    where: { email: autor },
                }
            );
        } catch (error) {
            return error;
        }
    }

    static async darNota(req, res) {
        try {
            if (req.body.nota > 5 || req.body.nota < 0) {
                return res.status(400).send("Nota tem que ser entre 0 e 5");
            }
            const buscaFilmes = await LeitorController._buscarFilmesApi("", req.query.id);
            const tituloFilme = buscaFilmes.data.Title;

            const jaAvaliou = await database.notas.findOne({
                where: {
                    imdbID: req.query.id,
                    autor: req.user.dataValues.email,
                },
            });

            if (jaAvaliou == undefined) {
                const nota = await database.notas.create({
                    titulo: tituloFilme,
                    nota: req.body.nota,
                    imdbID: req.query.id,
                    autor: req.user.dataValues.email,
                });
                await LeitorController._atualizaPonto(req.user.dataValues.email);
                return res.status(200).json({
                    message: nota,
                });
            } else {
                return res.status(400).send("Nota ja foi adicionada");
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = LeitorController;
