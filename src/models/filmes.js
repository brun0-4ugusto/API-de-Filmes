'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      filmes.belongsTo(models.usuarios,{
        foreignKey:'autor'
      })
    }
  }
  filmes.init({
    imdbID:DataTypes.STRING,
    titulo: DataTypes.STRING,
    comentario: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'filmes',
  });
  return filmes;
};