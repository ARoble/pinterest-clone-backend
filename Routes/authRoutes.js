const express = require("express");
const router = express.Router();

const authController = require("../Controllers/UserController");

router.route("/register").post(authController.register);
router.route("/users").get(authController.users);

module.exports = router;
