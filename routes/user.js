const router = require("express").Router();

const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const { checkRoleAdmin } = require("../middlewares/checkRole");
const validationId = require("../middlewares/validationId");

router.get("/", authentication, getAllUsers);
router.get("/:id", validationId("user"), authentication, getUserById);
router.patch("/:id", validationId("user"), authentication, checkRoleAdmin("superadmin", "admin"), updateUser);
router.delete("/:id", validationId("user"), authentication, checkRoleAdmin("superadmin", "admin"), deleteUser);

const UserRouter = router;
module.exports = UserRouter;
