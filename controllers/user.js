const { User } = require("../models");
const ApiError = require("../utils/apiError");

const updateUser = async (req, res, next) => {
  const { name, address, age } = req.body;
  const { id } = req.params;

  try {
    const editUser = await User.update(
      {
        name,
        address,
        age,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Success updated user",
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Success deleted user",
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
