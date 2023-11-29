const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/course.controller");
const multer = require("../../middlewares/multer")
const multerLib = require('multer')()

router.post("/course/category", multer.image.single('image_url'), controller.addCategory);
router.post("/course/level", controller.addLevel);
router.post("/course/type", controller.addType);
router.post("/course", controller.addCourse);


module.exports = router;