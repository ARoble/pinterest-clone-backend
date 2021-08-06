const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const db = require("../db/db");

exports.register = async (req, res, next) => {
  console.log("reached");
  try {
    const user = await User.create({
      email: "roble@gmail.com",
      password: "123",
      age: 12,
    });

    res.json({
      status: 200,
      message: "User has been created!!!!",
      user,
    });
  } catch (e) {
    return next({
      status: 401,
      message: e.message,
    });
  }
};
