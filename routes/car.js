const router = require("express").Router();

const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require("../controllers/car");
const authentication = require("../middlewares/authentication");
const { checkRoleAdmin } = require("../middlewares/checkRole");
const upload = require("../middlewares/imageUpload");
const validationId = require("../middlewares/validationId");

router.post("/", authentication, checkRoleAdmin("superadmin", "admin"), upload.single("image"), createCar);
router.get("/", authentication, getAllCars);
router.get("/:id", validationId("car"), authentication, getCarById);
router.patch("/:id", validationId("car"), authentication, checkRoleAdmin("superadmin", "admin"), upload.single("image"), updateCar);
router.delete("/:id", validationId("car"), authentication, checkRoleAdmin("superadmin", "admin"), deleteCar);

const CarRouter = router;
module.exports = CarRouter;
