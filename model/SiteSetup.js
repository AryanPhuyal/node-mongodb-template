const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const siteSetupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: "Name  must be unique",
      required: "Name is required",
    },
    appLogo: {
      type: String,
    },
  },
  { timestamps: true }
);
siteSetupSchema.plugin(beautifyUnique);
module.exports = mongoose.model("SiteSetup", siteSetupSchema);
