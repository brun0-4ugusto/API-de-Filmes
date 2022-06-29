const { existeComentario, existeUsuario } = require("../helpers/verificacoes");
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
                if (req.body.gostou == "true") {
                    await database.filmes.update({ gostei: 1 }, { where: { id: req.params.id } });
                } else if (req.body.gostou == "false") {
                    await database.filmes.update(
                        { naoGostei: 1 },
                        { where: { id: req.params.id } }
                    );
                } else {
                    return res.status(400).send("Parâmetro errado");
                }
                await database.filmes.update(
                    {
                        votantes: `{"usuario":"${req.user.dataValues.email}","gostou":"${req.body.gostou}"}`,
                    },
                    { where: { id: req.params.id } }
                );

                return res.status(200).send(temCurtida);
            }

            let curtidas = temCurtida.votantes;
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

            return res.status(200).send(novaCurtida);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = AvancadoController;
