const express = require("express");
const router = express.Router();
var authController = require("./authController");

router.post("/login", authController.login);

module.exports = router;
