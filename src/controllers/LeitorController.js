const database = require("../models");
const axios = require("axios");

class LeitorController {
    static async #buscarFilmesApi(titulo, imdbID,search){
        const resp = await axios.get(`https://www.omdbapi.com/`, {
                params: {
                    t: titulo,
                    i: imdbID,
                    s: search,
                    apikey: "cee96c18",
                },
            });

            return resp
    }

    static async #filmesComentarios(titulo,imdbID){

    }

    static async buscarFilmes(req, res) {
        try {
            const resp = await LeitorController.#buscarFilmesApi(req.query.titulo,req.query.id,req.query.search);

            return res.status(resp.status).json({
                message: resp.data,
            });
        } catch (err) {
            return res.status(500);
        }
    }

    static async darNota(){
        
    }
}

module.exports = LeitorController;
