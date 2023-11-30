const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/profile.controller");
const checkToken = require("../../middlewares/checkToken");

router.get("/", checkToken, controller.list);
router.post("/update", checkToken, controller.profile);
router.post("/change-password", checkToken, controller.changePassword);

module.exports = router;
