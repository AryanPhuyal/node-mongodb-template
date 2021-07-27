const Product = require("../model/Product");
const ValidationError = require("../config/handelers/Error");
const asyncHandler = require("express-async-handler");

exports.listProduct = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 10;
  const products = await Product.paginate(
    { ...option, deleted: false },
    { page, count }
  );
  req.products = products;
});

export async function listOneProduct(productId) {
  const product = Product.findById(productId, {
    deleted: false,
  });
  if (product) return product;
  throw ValidationError("Product not found");
}
