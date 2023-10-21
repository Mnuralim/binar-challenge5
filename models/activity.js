"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.Car, {
        foreignKey: "carId",
      });

      Activity.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Activity.init(
    {
      userId: DataTypes.INTEGER,
      carId: DataTypes.INTEGER,
      action: {
        type: DataTypes.ENUM(["create", "delete", "update"]),
        defaultValue: "create",
      },
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
