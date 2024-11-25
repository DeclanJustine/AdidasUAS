const createProducts = async (products) => {
  for (const product of products) {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to create product: ${errorData.error}`);
        continue;
      }

      const data = await response.json();
      console.log(`Product created successfully: ${data.product.name}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

module.exports = createProducts;
