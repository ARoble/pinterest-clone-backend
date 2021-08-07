const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db/db");

const User = db.define("User", {
  // email,password,age
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    isEmail: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
