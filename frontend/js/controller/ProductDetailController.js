angular.module("myApp").controller("ProductDetailController", function ($scope, $http, $routeParams, $location) {
  $scope.loading = true;
  $scope.error = null;
  $scope.product = {};
  $scope.selectedSize = null; // Default null
  $scope.isMenuActive = false;

  $scope.toggleMenu = function () {
    $scope.isMenuActive = !$scope.isMenuActive;
  };

  // Fungsi untuk mendapatkan detail produk
  function fetchProduct() {
    $http
      .get(`http://localhost:5000/api/products/${$routeParams.type}/${$routeParams.category}/${$routeParams.id}`)
      .then(function (response) {
        if (response.data?.product) {
          $scope.product = response.data.product;
        } else {
          $scope.error = "Product not found";
        }
      })
      .catch(function (error) {
        console.error(error);
        $scope.error = error.data?.error || "Failed to load product";
      })
      .finally(function () {
        $scope.loading = false;
      });
  }

  // Fungsi Buy Now
  $scope.buyNow = function () {
    if ($scope.selectedSize) {
      alert("Please select a size before buying.");
      return;
    }

    // Data yang dikirim ke backend
    const orderData = {
      userId: localStorage.getItem("userId"), // Ambil userId dari localStorage
      productId: $scope.product.id, // ID produk
      productName: $scope.product.name, // Nama produk
      productImage: $scope.product.image, // Gambar produk
      productPrice: $scope.product.price, // Harga produk
    };

    $http
      .post("http://localhost:5000/api/order", orderData)
      .then(function (response) {
        alert("Order placed successfully!");
        $location.path("/shop"); // Mengarahkan kembali ke halaman shop
      })
      .catch(function (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  fetchProduct();
});
