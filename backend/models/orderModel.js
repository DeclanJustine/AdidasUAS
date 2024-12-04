const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const OrderHistory = sequelize.define("OrderHistory", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User ID is required.",
        },
        isInt: {
          msg: "User ID must be an integer.",
        },
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product ID is required.",
        },
        isInt: {
          msg: "Product ID must be an integer.",
        },
      },
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name cannot be empty.",
        },
      },
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product image cannot be empty.",
        },
      },
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product price is required.",
        },
        isFloat: {
          msg: "Product price must be a valid number.",
        },
        min: {
          args: [0],
          msg: "Product price must be a positive number.",
        },
      },
    },
  });

  OrderHistory.associate = (models) => {
    OrderHistory.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    OrderHistory.belongsTo(models.Product, {
      foreignKey: "productId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return OrderHistory;
};
