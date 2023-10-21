const { login, checkMe, registerAdmin, registerMember } = require("../controllers/auth");
const authentication = require("../middlewares/authentication");
const { checkRoleSuperadmin } = require("../middlewares/checkRole");

const router = require("express").Router();

router.post("/admin/register", authentication, checkRoleSuperadmin("superadmin"), registerAdmin);
router.post("/member/register", registerMember);
router.post("/login", login);
router.get("/me", authentication, checkMe);

const authRouter = router;
module.exports = authRouter;
