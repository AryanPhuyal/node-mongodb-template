const ValidationError = require("../../config/handelers/Error");
const User = require("../../model/User");
const asyncHandeler = require("express-async-handler");

exports.login = asyncHandeler(async (req, res) => {
  // express validator error
  // check whether email exists or not
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ValidationError(`User with ${email} not exists`);
  }
  if (!user.validatePassword(password)) {
    throw new ValidationError(`Email or password not match`, {
      err: "Error occured",
    });
  }
  return res.json({
    success: true,
    message: "Successfully logged in",
    data: user.toAuthJSON(),
  });
});

exports.register = asyncHandeler(async (req, res) => {
  // express validator error

  const { firstname, lastname, email, password } = req.body;
  // check email already exists or not
  const userExists = await User.findOne({ email });
  // if (userExists) {
  //   throw new ValidationError(`User with ${email} already exists`);
  // }
  const user = new User({
    firstname,
    lastname,
    email,
  });
  user.setPassword(password);
  var newUser = await user.save();
  res.json({
    success: true,
    message: `User with ${email} register successfully`,
  });
});
