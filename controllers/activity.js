const { Activity } = require("../models");
const ApiError = require("../utils/apiError");

const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      include: ["User", "Car"],
    });

    res.status(200).json({
      success: true,
      data: {
        activities,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  getAllActivities,
};
