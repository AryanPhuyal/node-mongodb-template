const mongoose = require("mongoose");
const { MONGO_URI, IsProd } = require("./env");
const logger = require("./logger");

module.exports = () => {
  return mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};
