const { User } = require("../models");
const ApiError = require("./apiError");

const getUser = async (userId) => {
  if (userId) {
    const user = await User.findByPk(userId);
    return {
      id: user.id,
      name: user.name,
    };
  }
};
module.exports = getUser;
