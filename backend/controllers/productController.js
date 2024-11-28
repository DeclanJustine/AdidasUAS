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

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    await Product.destroy({ where: { id } });

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const editProduct = (req, res) => {
  const productId = req.params.productId;
  const { name, price, description, type, category } = req.body;
  
  console.log("Uploaded file:", req.file);  // Log the uploaded file

  // If no file is uploaded, fallback to the existing image
  let image = req.file ? `http://localhost:5000/assets/products/${req.file.filename}` : req.body.image;

  // Log the final image path
  console.log("Image path:", image);

  // Proceed with the update if all fields are valid
  Product.update(
      { name, price, description, type, category, image },
      { where: { id: productId } }
  )
  .then(updatedProduct => {
      res.status(200).json({ product: updatedProduct });
  })
  .catch(err => {
      console.error("Error updating product:", err);  // Log the error for debugging
      res.status(500).json({ error: "Failed to update product" });
  });
};



const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product retrieved successfully.", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { createProduct, getAllProducts, getProduct, getRandomProducts, deleteProduct, editProduct, getProductById};
