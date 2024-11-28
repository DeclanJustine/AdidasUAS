angular.module("myApp").controller("AdminEditProductController", function ($scope, $http, $routeParams) {
    const productId = $routeParams.productId;

    $scope.newValues = {};

    $scope.handleFileSelect = function (files) {
        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                $scope.$apply(function () {
                    $scope.newValues.image = files[0]; 
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };

    $http.get(`http://localhost:5000/api/products/${productId}`).then(function (response) {
        $scope.product = response.data.product;
        $scope.newValues = { ...$scope.product }; 
    });

    $scope.updateProduct = function () {
        const formData = new FormData();
        formData.append("name", $scope.newValues.name);
        formData.append("price", $scope.newValues.price);
        formData.append("description", $scope.newValues.description);
        formData.append("type", $scope.newValues.type);
        formData.append("category", $scope.newValues.category);

        if ($scope.newValues.image instanceof File) {
            formData.append("image", $scope.newValues.image);
        } else if ($scope.newValues.image) {
            formData.append("image", $scope.newValues.image);
        }

        $http.put(`http://localhost:5000/api/products/edit/${productId}`, formData, {
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            if (response.status === 200) {
                alert("Product updated successfully.");
                window.location.href = "#!/admin/products";
            } else {
                alert("Failed to update product.");
            }
        }).catch(function (error) {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product.");
        });
    };
});
