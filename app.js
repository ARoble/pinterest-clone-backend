const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: ".env" });

const db = require("./db/db");
//Test DB
db.authenticate()
  .then(() => console.log("Database has been connected ✅"))
  .catch((e) => console.log(e));

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));

const authRoutes = require("./Routes/authRoutes");

app.use("/api/v1/auth/", authRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || "An error occured.",
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Resource not found." });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
