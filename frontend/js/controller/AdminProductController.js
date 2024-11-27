angular.module("myApp").controller("AdminProductController", function($scope, $http, $location) {
    $scope.products = [];

    $scope.getAllProducts = async function() {
        try {
            const response = await $http.get("http://localhost:5000/api/products");

            if (response.status === 200) {
                $scope.products = response.data.products;
                console.log("Products retrieved successfully:", $scope.products);
                $scope.$apply();
            } else {
                alert("Failed to retrieve products data.");
            }
        } catch (error) {
            console.error("Error retrieving products:", error);
            alert("An error occurred while retrieving products data.");
        }
    };

    $scope.getAllProducts();
});
