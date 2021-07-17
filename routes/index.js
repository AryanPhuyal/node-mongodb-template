// user route
const { auth, user } = require("./user");
const siteSetup = require("./siteSetup");
// route setup
module.exports = (app) => {
  // user route
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/", siteSetup);
};
