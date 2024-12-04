const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/order', orderController.createOrder);
router.get('/order/history/:userId', orderController.getOrderHistory);
router.get("/orders", orderController.getAllOrder);
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
