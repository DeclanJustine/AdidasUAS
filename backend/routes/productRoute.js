const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/handleData');

router.post('/products', upload.single('image'), productController.createProduct);

router.get("/products", productController.getAllProducts);
router.get("/products/:type/:category/:id", productController.getProduct);
router.get('/products/random', productController.getRandomProducts);
router.get("/products/:productId", productController.getProductById);
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/edit/:productId", upload.single('image'), productController.editProduct);

module.exports = router;
