const express = require("express");
const router = express.Router();

const authController = require("../Controllers/UserController");

router.route("/register").get(authController.register);

module.exports = router;
