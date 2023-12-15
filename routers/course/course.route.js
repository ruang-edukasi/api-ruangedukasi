const express = require("express");
const router = express.Router();
const controller = require("../../controllers/course/course.controller");

router.get("/", controller.allCourse);
router.get("/:courseId", controller.detailCourse);
router.get("/category/:categoryId", controller.allCourseCategory);

module.exports = router;
