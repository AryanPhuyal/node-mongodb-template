const { IsProd } = require("../env");
const ValidationError = require("./Error");
const ServerError = require("./ServerError");

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return IsProd
      ? res.status(400).json({
          success: false,
          message: err.message,
          data: err.data,
        })
      : res.status(400).json({
          success: false,
          message: err.message,
          data: err.data,
          stacktrace: err.stacktrace,
        });
  } else if (err instanceof ServerError) {
    return IsProd
      ? res.status(500).json({
          success: false,
          message: err.message,
          data: err.data,
        })
      : res.status(500).json({
          success: false,
          message: err.message,
          data: err.data,
          stacktrace: err.stacktrace,
        });
  } else {
    if (IsProd)
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      stacktrace: err,
    });
  }
};
