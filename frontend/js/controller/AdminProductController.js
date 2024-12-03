angular.module("myApp").controller("AdminProductController", function($scope, $http, $location) {
    $scope.products = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10; // Jumlah produk per halaman

    $scope.getAllProducts = async function () {
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

    $scope.totalPages = function () {
        return Math.ceil($scope.products.length / $scope.itemsPerPage);
    };

    $scope.getPaginatedProducts = function () {
        const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        return $scope.products.slice(startIndex, endIndex);
    };

    $scope.previousPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.totalPages()) {
            $scope.currentPage++;
        }
    };

    $scope.logout = async function() {
        const token = localStorage.getItem('authToken'); 

        if (!token) {
            alert("No token found. Please log in again.");
            return;
        }

        try {
            const response = await $http.post("http://localhost:5000/api/logout", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userProfile');  
                $scope.$apply(() => {  
                    $location.path('/');  
                    alert("Logout Successsfully");
                });
                console.log("Logout Successfully");
            } else {
                alert("Failed to logout.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging out.");
        }
    };

    $scope.deleteProduct = async function(productId) {
        const confirmation = confirm("Are you sure you want to delete this product?");
        if (!confirmation) {
            return; 
        }

        try {
            const response = await $http.delete(`http://localhost:5000/api/products/${productId}`);

            if (response.status === 200) {
                $scope.products = $scope.products.filter(product => product.id !== productId);
                console.log("Product deleted successfully");
                $scope.$apply(() => {  
                    $location.path('/admin/products');  
                    alert("Product deleted successfully.");
                });
            } else {
                alert("Failed to delete the product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };

    $scope.getAllProducts();
});
