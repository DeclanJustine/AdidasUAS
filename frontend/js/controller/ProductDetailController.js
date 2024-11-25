angular.module("myApp").controller("ProductDetailController", function($scope, $http, $routeParams) {
    $scope.loading = true;
    $scope.error = null;
    $scope.product = {};
    $scope.selectedSize = null;
    $scope.isMenuActive = false;

    $scope.toggleMenu = function() {
      $scope.isMenuActive = !$scope.isMenuActive;
    };

    // Mengubah fetch menjadi promise style yang sesuai dengan AngularJS
    function fetchProduct() {
      $http.get(`http://localhost:5000/api/products/${$routeParams.type}/${$routeParams.category}/${$routeParams.id}`)
        .then(function(response) {
          if (response.data?.product) {
            $scope.product = response.data.product;
          } else {
            $scope.error = "Product not found";
          }
        })
        .catch(function(error) {
          console.error(error);
          $scope.error = error.data?.error || "Failed to load product";
        })
        .finally(function() {
          $scope.loading = false;
          // Memastikan perubahan terdeteksi
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        });
    }

    $scope.setMainImage = function(imageUrl) {
      $scope.product.image = imageUrl;
    };

    $scope.addToCart = function() {
      console.log("Adding to cart:", {
        product: $scope.product
      });
    };

    $scope.buyNow = function() {
      if ($scope.selectedSize) {
        console.log("Proceeding to buy product with size:", $scope.selectedSize);
      } else {
        console.log("Please select a size first.");
      }
    };

    fetchProduct();
});
