const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/user.controller");
const checkToken = require("../../middlewares/checkToken");

    router.post('/signup', controller.signup);
    router.post('/login', controller.login);
    router.post('/resetpw', controller.resetPassword);
    router.post('/setpw', checkToken, controller.setPassword);
    router.post('/requestOTP', checkToken, controller.requestOTP);
    router.post('/verifyOTP', checkToken, controller.verifyOTP);

module.exports = router;