const database = require("../models");
const bcrypt = require("bcrypt");

class UsuarioController {

    static #gerarSenhaHash(senha) {
        const custo = 12;
        return bcrypt.hash(senha, custo);
    }

    static async cadastrarUsuario(req, res) {
        
        const { nome, email, senha } = req.body;
        

        try {
            const senhaHasheada = await UsuarioController.#gerarSenhaHash(senha)
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
                return res.status(400).json("Usuário já cadastrado");
            }
        } catch (err) {
            return res.status(500);
        }
    }

    
}

module.exports = UsuarioController;
