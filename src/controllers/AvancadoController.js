const { existeComentario, existeUsuario, gostou, jaGostou } = require("../helpers/verificacoes");
const database = require("../models");

class AvancadoController {
    static async curtir(req, res) {
        try {
            await existeComentario(req.params.id);
            await existeUsuario(req.user.dataValues.email);
            const temCurtida = await database.filmes.findOne({
                where: { id: req.params.id },
                attributes: ["votantes"],
            });

            if (temCurtida.votantes == null) {
                await gostou(req.body.gostou, req.params.id);

                const voto = await database.filmes.update(
                    {
                        votantes: `{"usuario":"${req.user.dataValues.email}","gostou":"${req.body.gostou}"}`,
                    },
                    { where: { id: req.params.id } }
                );

                return res.status(200).send("voto enviado com sucesso");
            }

            let curtidas = temCurtida.votantes;

            await jaGostou(curtidas, req.user.dataValues.email, req.body.gostou);
            curtidas = curtidas.split();
            const novaCurtida = `{"usuario":"${req.user.dataValues.email}","gostou":"${req.body.gostou}"}`;
            curtidas.push(novaCurtida);
            curtidas = String(curtidas);
            await database.filmes.update(
                {
                    votantes: curtidas,
                },
                { where: { id: req.params.id } }
            );

            if (req.body.gostou == "true") {
                const gosteiLinha = await database.filmes.findOne({
                    where: { id: req.params.id },
                    attributes: ["gostei"],
                });
                let gostei = gosteiLinha.dataValues.gostei;
                gostei += 1;
                await database.filmes.update({ gostei: gostei }, { where: { id: req.params.id } });
            } else if (req.body.gostou == "false") {
                const naoGosteiLinha = await database.filmes.findOne({
                    where: { id: req.params.id },
                    attributes: ["naoGostei"],
                });

                let naoGostei = naoGosteiLinha.dataValues.naoGostei;
                naoGostei += 1;
                await database.filmes.update(
                    { naoGostei: naoGostei },
                    { where: { id: req.params.id } }
                );
            }

            return res.status(200).send(curtidas);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async citar(req, res) {
        try {
            const comentarioCitado = await database.filmes.findOne({
                where: { id: req.params.id },
                attributes: ["comentario"],
            });
            return res.status(200).json({ "Comentario Citado": comentarioCitado.comentario });
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async todasCurtidas(req, res) {
        try {
            const curtidas = await database.filmes.findOne({
                where: { id: req.params.id },
                attributes: ["gostei", "naoGostei"],
            });
            return res
                .status(200)
                .json({ Gostei: curtidas.gostei, "Não Gostei": curtidas.naoGostei });
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = AvancadoController;
