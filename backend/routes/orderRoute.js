const express = require('express');
const router = express.Router();
const { createOrder, getOrderHistory } = require('../controllers/orderController');

router.post('/order', createOrder);
router.get('/order/history/:userId', getOrderHistory);

module.exports = router;
