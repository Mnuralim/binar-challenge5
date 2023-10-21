const router = require("express").Router();

const { getAllActivities } = require("../controllers/activity");
const authentication = require("../middlewares/authentication");
const { checkRoleAdmin } = require("../middlewares/checkRole");

router.get("/", authentication, checkRoleAdmin("superadmin", "admin"), getAllActivities);

const ActivityRouter = router;
module.exports = ActivityRouter;
