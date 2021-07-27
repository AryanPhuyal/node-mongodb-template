const Product = require("../model/Product");
const ValidationError = require("../config/handelers/Error");
const asyncHandeler = require("express-async-handler");

exports.createProduct = asyncHandeler(async (req, res) => {
  const product = req.body;
  const product = new Product(product);
  await product.save();
  req.product = product;
});

exports.editProduct = asyncHandeler(async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  const oldProduct = await Product.findById(productId);
  if (!oldProduct) throw ValidationError("Medicine not found");

  oldProduct.name = product.name || oldProduct.name;
  oldProduct.chemicalName = product.chemicalName || oldProduct.chemicalName;
  oldProduct.companyName = product.companyName || oldProduct.companyName;
  oldProduct.needPrescription =
    product.needPrescription || oldProduct.needPrescription;
  oldProduct.cost = product.cost || oldProduct.cost;
  oldProduct.discount = product.discount || oldProduct.discount;
  oldProduct.generalMedicine =
    product.generalMedicine || oldProduct.generalMedicine;
  oldProduct.precaution = product.precaution || oldProduct.precaution;
  oldProduct.ingredient = product.ingredient || oldProduct.ingredient;
  oldProduct.sideEffects = product.sideEffects || oldProduct.sideEffects;
  oldProduct.manufactureAt = product.manufactureAt || oldProduct.manufactureAt;
  oldProduct.expiryDate = product.expiryDate || oldProduct.expiryDate;
  oldProduct.quantity = product.quantity || oldProduct.quantity;
  error = await oldProduct.validate();
  if (error) throw error;
  await oldProduct.save();
  req.product = oldProduct;
});

exports.deleteProduct = async (productId) => {
  const oldProduct = await Product.findById(productId);
  if (!oldProduct) throw ValidationError("Product not Found");
  oldProduct.delete = true;
};
