const express = require("express");
const router = express.Router();
const controller = require("../../controllers/course/type.controller");

router.get("/", controller.allType);

module.exports = router;
