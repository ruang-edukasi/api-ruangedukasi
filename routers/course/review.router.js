const express = require("express");
const router = express.Router();
const controller = require("../../controllers/course/review.controller");

router.get("/courses/:courseId/reviews", controller.getCourseReviews); 
router.post("/courses/:courseId/reviews", controller.addCourseReview); 

module.exports = router;