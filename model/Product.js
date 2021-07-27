const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requires: "Name is required",
    },

    chemicalName: {
      type: String,
      required: "Chemical Name is required",
    },
    companyName: {
      type: String,
      required: "Company Name is required",
    },
    needPrescription: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
      required: "Price is required",
    },
    discount: {
      type: Number,
      default: 0,
    },
    generalMedicine: {
      type: Boolean,
      default: false,
    },
    precaution: {
      type: String,
    },

    ingredient: {
      type: String,
    },
    sideEffects: {
      type: String,
    },
    precaution: {
      type: String,
      required: "Precaution is required",
    },
    image: {
      type: String,
    },
    manufactureAt: {
      type: Date,
      required: "Manufacture date for medicine is required",
    },
    expiryDate: {
      type: Date,
      required: "Expiry date for medicine is required",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: "Quantity for product is required",
    },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
