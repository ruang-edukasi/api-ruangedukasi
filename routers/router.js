const express = require("express");
const router = express.Router();

// Default router
router.get("/", (req, res) => {
  return res.json({
    error: false,
    statusCode: 200,
    message: "Successful access homepage API",
  });
});

module.exports = router;
