const jwt = require("jsonwebtoken");
const User = require("../model/User");
const UserType = require("../model/UserType");

const Role = require("../model/Role");

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      let data = jwt.verify(bearerToken, process.env.JWT_SECRET);
      let userId = data.id;
      let user = await User.findById(userId);
      if (user) {
        let userType = await UserType.findById(user.userType)
        if (userType.name.toLowerCase == 'superadmin') {
          req.role = "superadmin"
        } else {
          let role = await Role.findOne({ userType: user.userType });
          req.user = user;
          req.role = role;
        }
        next();
      } else {
        throw "error";
      }
    } else {
      throw "error";
    }
  } catch (err) {
    req.user = null;
    req.role = null;

    next();
  }
};
