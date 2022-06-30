const database = require("../models");
const bcrypt = require("bcrypt");
const axios = require("axios");

class UsuarioController {
    static async buscaPorUsuario(email) {
        try {
            return await database.usuarios.findOne({
                where: { email: email },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
    static #gerarSenhaHash(senha) {
        const custo = 12;
        return bcrypt.hash(senha, custo);
    }

    static async cadastrarUsuario(req, res) {
        const { nome, email, senha } = req.body;

        try {
            if(nome.length == 0){
                return res.status(400).send("Nome inválido");
            }
            if(email.length == 0){
                return res.status(400).send("Email inválido");
            }
            if (senha.length < 4) {
                return res.status(400).send("Senha Não Condiz Com Requisítos Mínimos");
            }
            const senhaHasheada = await UsuarioController.#gerarSenhaHash(senha);
            const checagemEmailDuplicado = await database.usuarios.findOne({
                where: { email: email },
            });
            if (checagemEmailDuplicado == undefined) {
                const novoUsuarioCriado = await database.usuarios.create({
                    nome: nome,
                    email: email,
                    senha: senhaHasheada,
                });
                return res.status(201).json(novoUsuarioCriado);
            } else {
                return res.status(400).send("Usuário já cadastrado");
            }
        } catch (err) {
            return res.status(500);
        }
    }

    static async login(req, res) {
        try {
            const axiosResp = await axios.post("http://localhost:4000/usuario/login", {
                email: req.body.email,
                senha: req.body.senha,
            });

            res.set("Authorization", axiosResp.headers.authorization);
            res.status(204).send();
        } catch (error) {
            if (error.response.status == 401) {
                return res.status(401).json(error.response.data);
            }
            return res.status(500).json(error.response.data);
        }
    }
}

module.exports = UsuarioController;
