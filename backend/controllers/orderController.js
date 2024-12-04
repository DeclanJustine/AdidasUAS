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

  const getAllOrder = async (req, res) => {
    try {
      const allOrders = await OrderHistory.findAll({
        attributes: [
          "id",
          "userId",
          "productName",
          "productImage",
          "productPrice",
          "createdAt",
        ],
        order: [["createdAt", "DESC"]],
      });
  
      if (allOrders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
      }
  
      res.status(200).json({
        message: "All orders retrieved successfully.",
        data: allOrders,
      });
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({
        message: "An error occurred while fetching all orders.",
        error: error.message,
      });
    }
  };

  const deleteOrder = async (req, res) => {
    const { id } = req.params;  
    
    try {
      const order = await OrderHistory.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }
      
      await order.destroy();

      res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({
        message: "An error occurred while deleting the order.",
        error: error.message,
      });
    }
  };

module.exports = {createOrder, getOrderHistory, getAllOrder, deleteOrder};