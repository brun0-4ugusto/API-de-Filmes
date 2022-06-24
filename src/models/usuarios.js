"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class usuarios extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            usuarios.hasMany(models.Filmes,{
              foreignKey:'autor'
            });
        }
    }
    usuarios.init(
        {
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            funcao: DataTypes.STRING,
            pontos: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "usuarios",
        }
    );
    return usuarios;
};