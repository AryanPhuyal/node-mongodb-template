const router = require("express").Router();
const { listProduct } = require("../../service/listProduct");
const { createProduct } = require("../../service/createProduct");

const {
  listProduct: listProductController,
} = require("../../controllers/product");
const {
  createProduct: createProductController,
} = require("../../controllers/product/createProduct");

router.get("/", listProduct, listProductController);
router.post("/", createProduct, createProductController);
