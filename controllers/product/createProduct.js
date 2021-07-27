// only admin
const asyncHandeler = require("express-async-handler");

exports.createProduct = asyncHandeler(async (req, res) => {
  res.json({
    success: true,
    data: req.product,
  });
});

exports.listOneProduct = asyncHandeler(async (req, res) => {
  res.json({
    success: true,
    data: req.product,
  });
});

exports.editProduct = asyncHandeler(async (req, res) => {
  res.json({
    success: true,
    data: req.product,
  });
});

exports.deleteProduct = asyncHandeler(async (req, res) => {
  res.json({
    success: true,
    message: "Successfully deleted product",
  });
});
