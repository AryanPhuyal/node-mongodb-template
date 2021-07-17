const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: "First Name is required",
    },
    lastname: {
      type: String,
      required: "Last Name is required",
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: "Email address alreay used",
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    userType: {
      type: mongoose.Types.ObjectId,
      required: "User type is required",
    },
    phoneNo: {
      type: String,
      required: "Phone Number is required",
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.password === hash;
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  console.log(process.env.JWT_SECRET);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,

      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    process.env.JWT_SECRET
  );
};

userSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    emailVerified: this.emailVerified,
    phoneVerified: this.phoneVerified,
    token: this.generateJWT(),
  };
};
userSchema.plugin(beautifyUnique);

module.exports = mongoose.model("User", userSchema);
