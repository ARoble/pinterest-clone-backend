const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const db = require("../db/db");
const Jwt = require("jsonwebtoken");

function createToken(user, statusCode, req, res) {
  const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}

exports.users = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({
      status: 200,
      message: "Found all users",
      users,
    });
  } catch (e) {
    return next({
      status: 401,
      message: e.message,
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, age } = req.body;
    if (!(email && password && age)) {
      return next({
        status: 400,
        message: "Please fill out all required fields",
      });
    }

    // const exsist = await User.findOne({ email: email });
    const exsist = await User.count({
      where: {
        email: email,
      },
    });
    if (exsist > 0) {
      return next({
        status: 409,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      age,
    });

    createToken(newUser, 201, req, res);
  } catch (e) {
    return next({
      status: 401,
      message: e.message,
    });
  }
};
