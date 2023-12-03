const express = require("express");
const router = express.Router();
const authAdminRouter = require("./admin/auth.route");
const profileAdminRouter = require("./admin/profile.route");
const courseAdminRouter = require("./admin/course.route");
const authUserRouter = require("./user/auth.route");
const profileUserRouter = require("./user/profile.route");
const categoryRouter = require("./course/category.route");
const levelRouter = require("./course/level.route");
const typeRouter = require("./course/type.route");
const courseRouter = require("./course/course.route");
const searchCourseRouter = require("./course/search.route");

// Default router
router.get("/", (req, res) => {
  return res.json({
    error: false,
    statusCode: 200,
    message: "Successful access homepage API",
  });
});

// Admin
router.use("/auth/admin", authAdminRouter);
router.use("/admin/profile", profileAdminRouter);
router.use("/admin", courseAdminRouter);

// User
router.use("/auth/user", authUserRouter);
router.use("/user/profile", profileUserRouter);

// Course
router.use("/category", categoryRouter);
router.use("/level", levelRouter);
router.use("/type", typeRouter);
router.use("/course", courseRouter);
router.use("/search", searchCourseRouter);

module.exports = router;
