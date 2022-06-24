'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notas.belongsTo(models.usuarios,{
        foreignKey:'autor'
      })
    }
  }
  notas.init({
    titulo: DataTypes.STRING,
    nota: DataTypes.INTEGER,
    imdbID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notas',
  });
  return notas;
};