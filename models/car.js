"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.Activity, {
        foreignKey: "carId",
      });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM(["small", "medium", "large"]),
        defaultValue: "small",
      },
      image: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Car",
    }
  );
  return Car;
};
