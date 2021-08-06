const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize.sync().then(() => console.log("Databases have been created"));

module.exports = sequelize;
