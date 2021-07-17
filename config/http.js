const express = require("express");
const cors = require("cors");
const app = express();
const { IsProd } = require("./env");
const mongooseError = require("./handelers/mongooseError");
const errorHandeler = require("./handelers/errorHandeler");
const routes = require("../routes");
const path = require("path");
const asyncHandeler = require("express-async-handler");

const authMiddleware = require("../middleware/auth");
app.use(cors());
app.use(express.json());

// set static files
app.use(express.static(path.join(__dirname, "public")));
// if devlopment environment i
if (!IsProd) {
  app.use(require("morgan")("dev"));
}

// setup routes
app.use(authMiddleware);
routes(app);
// error midleware

app.use("/", mongooseError);
app.use("/", errorHandeler);

// page not found handeler
app.use("/api", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use("/", (req, res) => {
  res.status(404).send("<h1>Requested page not found</h1>");
});

module.exports = app;
