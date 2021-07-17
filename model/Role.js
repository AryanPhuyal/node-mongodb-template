const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

/**
 * 
 * each document has diffrent roles for diffrent user type
 * role assigment 
    -  1 = read 
    -  2 = write
    -  4 =  delete
 * adding this role gives combined role
 * roles contains 2 part i.e. 2 digit  first is for own document and other for other document
 * default role is read and read
*/

const roleSchema = new mongoose.Schema(
  {
    userType: {
      type: mongoose.Types.ObjectId,
      required: "User type is required",
      unique: "One uset type contains only one role",
    },
    roles: {
      document: {
        type: String,
        required: "Document name is required",
        unique: "Document name cant be overwritten",
      },
      role: {
        type: Number,
        default: 11,
      },
    },
  },
  { timestamps: true }
);
roleSchema.plugin(beautifyUnique);

module.exports = mongoose.model("Role", roleSchema);
