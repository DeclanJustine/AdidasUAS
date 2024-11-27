angular.module("myApp").controller("AdminCreateProductController", function($scope, $http, $location) {
    $scope.product = {
        image: '',
        name: '',
        price: '',
        description: '',
        type: '',
        category: ''
    };
    
    $scope.submitted = false;

    $scope.handleFileSelect = function(files) {
        if (files.length > 0) {
            const file = files[0];
            $scope.$apply(function() {
                $scope.product.image = 'http://localhost:5000/assets/products/' + file.name;
            });
        }
    };

    $scope.createProduct = function() {
        $scope.submitted = true;

        if (!$scope.createProductForm.$valid || !$scope.product.image) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        const productData = {
            image: $scope.product.image,
            name: $scope.product.name,
            price: parseFloat($scope.product.price),
            description: $scope.product.description,
            type: $scope.product.type,
            category: $scope.product.category
        };

        $http({
            method: 'POST',
            url: 'http://localhost:5000/api/products',
            data: productData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            console.log('Success:', response);
            alert("Product created successfully!");
            $location.path("/admin/products");
        })
        .catch(function(error) {
            console.error('Error:', error);
            alert("Error: " + (error.response?.data?.error || "Failed to create product"));
        });
    };
});