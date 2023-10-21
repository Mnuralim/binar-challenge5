const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

const registerAdmin = async (req, res, next) => {
  const { name, email, password, confirmPassword, age, address, role } = req.body;

  try {
    const admin = await Auth.findOne({
      where: {
        email,
      },
    });

    if (admin) {
      return next(new ApiError("admin email already taken", 400));
    }

    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400));
    }

    if (password !== confirmPassword) {
      return next(new ApiError("password does not match", 400));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await User.create({
      name,
      age,
      address,
      role,
    });

    const newAuth = await Auth.create({
      email,
      password: hashedPassword,
      userId: newAdmin.id,
    });

    res.status(201).json({
      success: true,
      message: "register admin successfully",
      data: {
        user: {
          ...newAdmin,
          email,
        },
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const registerMember = async (req, res, next) => {
  const { name, email, password, confirmPassword, age, address } = req.body;

  try {
    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("User email already taken", 400));
    }

    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400));
    }

    if (password !== confirmPassword) {
      return next(new ApiError("password does not match", 400));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      age,
      address,
    });

    const newAuth = await Auth.create({
      email,
      password: hashedPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      success: true,
      message: "register successfully",
      data: {
        user: {
          ...newUser,
          email,
        },
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const findUser = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (!findUser) return next(new ApiError("User not found", 404));

    const match = await bcrypt.compare(password, findUser.password);
    if (!match) return next(new ApiError("Password don't match", 400));

    const payload = {
      id: findUser.User.id,
      email: findUser.email,
      name: findUser.User.name,
      role: findUser.User.role,
    };

    const token = jwt.sign(payload, process.env.JWT);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const checkMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  registerMember,
  registerAdmin,
  login,
  checkMe,
};
