const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name cannot be empty.",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "Price must be a valid number.",
        },
        min: {
          args: [0],
          msg: "Price must be a positive number.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("men", "women", "kids"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["men", "women", "kids"]],
          msg: "Type must be 'men', 'women', or 'kids'.",
        },
      },
    },
    category: {
      type: DataTypes.ENUM("originals", "running", "sports"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["originals", "running", "sports"]],
          msg: "Category must be 'originals', 'running', or 'sports'.",
        },
      },
    },
  });

  return Product;
};