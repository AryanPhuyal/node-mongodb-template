const SiteSetup = require("../model/SiteSetup");
const UserType = require("../model/UserType");
const User = require("../model/User");
const Role = require("../model/Role");
const asyncHandeler = require("express-async-handler");
const userjson = require("../postsetup/user.json");
const appJson = require("../postsetup/app.json");
const userTypeJson = require("../postsetup/usertype.json");
const ServerError = require("../config/handelers/ServerError");

exports.init = async () => {
  const initapp = await SiteSetup.find().estimatedDocumentCount();
  if (initapp !== 0) {
  } else {
    const newSite = new SiteSetup({
      name: appJson.name,
    });
    await newSite.save();
    try {
      console.log("creating user type");
      await Promise.all([
        ...userTypeJson.map((e) => {
          const newUserType = new UserType({ name: e.name });
          return newUserType.save();
        }),
      ]);
    } catch (err) {}

    const normalUser = await UserType.findOne({ name: "user" });
    if (!normalUser) {
      throw new ServerError(
        "User should be included in json file before app inilization"
      );
    }
    const superAdmin = await UserType.findOne({ name: "superadmin" });
    if (!superAdmin) {
      throw new ServerError(
        "Super admin user type should be included in json file before app inilization"
      );
    }
    if (normalUser && superAdmin)
      userjson.forEach(async (e) => {
        const newUser = new User({
          firstname: e.firstname,
          lastname: e.lastname,
          email: e.email,
          password: e.password,
          phoneNo: e.phoneNo,
          userType: e.type === "superadmin" ? superAdmin._id : normalUser._id,
        });
        await newUser.save();
        console.log(e.firstname, " user created");
      });
  }
};
exports.addNewUserType = asyncHandeler(async (req, res) => {
  const { name } = req.body;
  const newUserType = new UserType({ name });
  await newUserType.save();
  res.json({
    success: true,
    message: `user type ${name} successfully created`,
    data: newUserType,
  });
});
exports.addNewRole = asyncHandeler(async (req, res) => {});
exports.editRole = asyncHandeler(async (req, res) => {});
