const { User, Car } = require("../models");
const ApiError = require("../utils/apiError");

const validationId = (model) => {
  if (model === "user") {
    return async (req, res, next) => {
      const { id } = req.params;
      const user = await User.findByPk(parseInt(id));
      if (!user) return next(new ApiError("User not found", 404));
      next();
    };
  } else if (model === "car") {
    return async (req, res, next) => {
      const { id } = req.params;
      const car = await Car.findByPk(parseInt(id));
      if (!car) return next(new ApiError("Car not found", 404));
      next();
    };
  }
};

module.exports = validationId;
