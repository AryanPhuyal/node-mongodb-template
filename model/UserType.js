const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const userTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: "User type must be uique",
      required: "User type is required",
    },
  },
  { timestamps: true }
);
userTypeSchema.plugin(beautifyUnique);

module.exports = mongoose.model("UserType", userTypeSchema);
