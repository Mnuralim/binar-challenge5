const imagekit = require("../libs/imagekit");
const { Car, Activity } = require("../models");
const ApiError = require("../utils/apiError");

const createCar = async (req, res, next) => {
  const { name, price, available, type } = req.body;

  try {
    const { file } = req;

    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-CAR-${Date.now()}.${ext}`,
    });

    const newCar = await Car.create({
      name,
      price,
      available,
      type,
      image: img.url,
    });

    const activity = await Activity.create({
      userId: req.user.id,
      carId: newCar.id,
      action: "create",
    });

    res.status(200).json({
      success: true,
      message: "Success added new car",
      data: {
        car: newCar,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getAllCars = async (req, res, next) => {
  const { name, available, category } = req.query;
  const condition = {};

  if (name) {
    condition.name = { [Op.like]: "%" + name + "%" };
  }
  if (available) {
    condition.available = available;
  }
  if (category) {
    condition.category = category;
  }
  try {
    const cars = await Car.findAll({ where: condition });

    res.status(200).json({
      success: true,
      data: {
        cars,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getCarById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const car = await Car.findByPk(id);
    res.status(200).json({
      success: true,
      data: {
        car,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const updateCar = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, available, type } = req.body;

  try {
    const { file } = req;
    const car = await Car.findByPk(id);

    let imageUrl;
    if (!file) {
      imageUrl = car.image;
    } else {
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];
      const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-CAR-${Date.now()}.${ext}`,
      });
      imageUrl = img.url;
    }

    const updateCar = await Car.update(
      {
        name,
        price,
        available,
        type,
        image: imageUrl,
      },
      {
        where: {
          id,
        },
      }
    );

    await Activity.create({
      userId: req.user.id,
      carId: id,
      action: "update",
    });

    res.status(200).json({
      success: true,
      message: "Success updated car",
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const deleteCar = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteCar = await Car.destroy({
      where: {
        id,
      },
    });

    await Activity.create({
      userId: req.user.id,
      carId: id,
      action: "delete",
    });

    res.status(200).json({
      success: true,
      message: "Success deleted car",
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
