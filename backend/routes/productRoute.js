const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/products", productController.createProduct);

router.get("/products", productController.getAllProducts);
router.get("/products/:type/:category/:id", productController.getProduct);

module.exports = router;