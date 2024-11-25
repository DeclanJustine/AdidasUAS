angular.module("myApp").controller("ShopController", function ($scope, $http) {
  $scope.isMenuActive = false;
  $scope.products = [];

  // Toggle navigation menu
  $scope.toggleMenu = function () {
    $scope.isMenuActive = !$scope.isMenuActive;
  };

  // Fetch random products
  const loadRandomProducts = () => {
    $http.get("http://localhost:5000/api/products/random")
      .then((response) => {
        $scope.products = response.data.products;
      })
      .catch((error) => {
        console.error("Failed to fetch random products:", error);
      });
  };

  // Initialize controller
  const init = () => {
    loadRandomProducts();
  };

  init();
});
