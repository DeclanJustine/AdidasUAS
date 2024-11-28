angular.module("myApp").controller("AdminCreateProductController", function($scope, $http, $location) {
    $scope.product = {
        imageFile: null, // Simpan file asli, bukan hanya URL
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
                $scope.product.imageFile = file; 
            });
        }
    };

    $scope.createProduct = function() {
        $scope.submitted = true;

        if (!$scope.createProductForm.$valid || !$scope.product.imageFile) {
            alert('Please fill in all required fields correctly and select an image.');
            return;
        }

        const formData = new FormData();
        formData.append("image", $scope.product.imageFile);
        formData.append("name", $scope.product.name);
        formData.append("price", parseFloat($scope.product.price));
        formData.append("description", $scope.product.description);
        formData.append("type", $scope.product.type);
        formData.append("category", $scope.product.category);

        $http({
            method: 'POST',
            url: 'http://localhost:5000/api/products',
            data: formData,
            headers: {
                'Content-Type': undefined 
            },
            transformRequest: angular.identity 
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
