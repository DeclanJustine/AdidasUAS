const { Product } = require("../models");
const sequelize = require("../config/db");

const createProduct = async (req, res) => {
  try {
    const { image, name, price, description, type, category } = req.body;

    if (!image || !name || !price || !type || !description || !category) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const product = await Product.create({
      image,
      name,
      price,
      description,
      type,
      category,
    });

    res.status(201).json({ message: "Product created successfully.", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res
      .status(200)
      .json({ message: "Products retrieved successfully.", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getProduct = async (req, res) => {
  try {
    const { type, category, id } = req.params;

    const validTypes = ["men", "women", "kids"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid type. Must be 'men', 'women', or 'kids'." });
    }

    const validCategories = ["originals", "sports", "running"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category. Must be 'originals', 'sports', or 'running'." });
    }

    const product = await Product.findOne({
      where: {
        type,
        category,
        id,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product retrieved successfully.", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getRandomProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: sequelize.random(),
      limit: 8,
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }

    res.status(200).json({ message: "Random products retrieved successfully.", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { createProduct, getAllProducts, getProduct , getRandomProducts};
