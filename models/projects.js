'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    technologies: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};