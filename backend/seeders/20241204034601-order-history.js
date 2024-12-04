'use strict';

const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [];
    const userIds = Array.from({ length: 100 }, (_, i) => i + 2); 

    const products = await queryInterface.sequelize.query(
      'SELECT * FROM "Products";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!products || products.length === 0) {
      throw new Error("Produk tidak tersedia. Pastikan produk sudah ada di database.");
    }

    for (let i = 0; i < 100; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];

      orders.push({
        userId: randomUserId,
        productId: randomProduct.id, 
        productName: randomProduct.name,
        productImage: randomProduct.image,
        productPrice: randomProduct.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('OrderHistories', orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderHistories', null, {});
  },
};
