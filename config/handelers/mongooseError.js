const Mongoose = require("mongoose");

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  console.log(err);
  const error = err.errors;
  return res.status(code).send({ messages: error, fields: field });
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
  if (err instanceof Mongoose.Error.ValidationError) {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let newErrors = [];
    Object.values(err.errors).forEach((j) => {
      newErrors.push({
        name: j.name,
        message: j.message,
        type: j.kind,
        path: j.path,
      });
    });
    // newErrors =
    let code = 400;
    if (errors.length > 1) {
      const formattedErrors = errors.join(", ");
      res.status(code).json({
        messages: formattedErrors,
        fields: fields,
        errors: newErrors,
      });
    } else {
      res.status(code).json({ messages: errors, fields: fields });
    }
  }
};
//error controller function
module.exports = (err, req, res, next) => {
  if (err.code && err.code == 11000)
    return (err = handleDuplicateKeyError(err, res));

  if (err instanceof Mongoose.Error.ValidationError) {
    try {
      if (err.name === "ValidationError")
        return (err = handleValidationError(err, res));
      if (err.code && err.code == 11000)
        return (err = handleDuplicateKeyError(err, res));
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "An unknown error occurred.",
      });
    }
  } else if (err instanceof Mongoose.Error.CastError) {
    const error = `Invalid ${err.path}: ${err.value}`;
    res
      .status(400)
      .json({ messages: error, fields: Object.keys(err.keyValue) });
  } else {
    next(err);
  }
};
