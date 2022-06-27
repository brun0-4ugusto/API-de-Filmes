'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class respostas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      respostas.belongsTo(models.filmes,{
        foreignKey:'idComentario'
      })
      respostas.belongsTo(models.usuarios,{
        foreignKey:'autor'
      })
    }
  }
  respostas.init({
    resposta: DataTypes.TEXT,
    autor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'respostas',
  });
  return respostas;
};