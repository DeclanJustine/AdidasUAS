const { OrderHistory, Product } = require("../models");

const createOrder = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    if (!userId || !productId) {
      return res.status(400).json({
        message: "Missing required fields: userId or productId.",
      });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const newOrder = await OrderHistory.create({
      userId,
      productId,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
    });

    res.status(201).json({
      message: "Order created successfully.",
      order: {
        id: newOrder.id,
        userId: newOrder.userId,
        productId: newOrder.productId,
        productName: newOrder.productName,
        productImage: newOrder.productImage,
        productPrice: newOrder.productPrice,
        createdAt: newOrder.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "An error occurred while creating the order.",
      error: error.message,
    });
  }
};

const getOrderHistory = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orderHistory = await OrderHistory.findAll({
        where: { userId },
        attributes: ["id", "productName", "productImage", "productPrice", "createdAt"],
        order: [["createdAt", "DESC"]],
      });
  
      if (orderHistory.length === 0) {
        return res.status(404).json({ message: "No orders found for this user." });
      }
  
      res.status(200).json({
        message: "Order history retrieved successfully.",
        data: orderHistory,
      });
    } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json({
        message: "An error occurred while fetching the order history.",
        error: error.message,
      });
    }
  };  

module.exports = {
  createOrder,
  getOrderHistory,
};
