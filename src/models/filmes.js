'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filmes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Filmes.belongsTo(models.usuarios,{
        foreignKey:'autor'
      })
    }
  }
  Filmes.init({
    imdbID:DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    comentario: DataTypes.TEXT,
    nota: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Filmes',
  });
  return Filmes;
};