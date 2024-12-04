angular.module("myApp").controller("AdminOrderController", function($scope, $http, $location) {
    $scope.orders = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5; 

    $scope.getAllOrders = async function() {
        try {
            const response = await $http.get("http://localhost:5000/api/orders");

            if (response.status === 200) {
                $scope.orders = response.data.data;
                console.log("Orders retrieved successfully:", $scope.orders);
                $scope.$apply();
            } else {
                alert("Failed to retrieve orders.");
            }
        } catch (error) {
            console.error("Error retrieving orders:", error);
            alert("An error occurred while retrieving orders.");
        }
    };

    $scope.totalPages = function() {
        return Math.ceil($scope.orders.length / $scope.itemsPerPage);
    };

    $scope.getPaginatedOrders = function() {
        const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        return $scope.orders.slice(startIndex, endIndex);
    };

    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.totalPages()) {
            $scope.currentPage++;
        }
    };

    $scope.deleteOrder = async function(orderId) {
        const confirmation = confirm("Are you sure you want to delete this order?");
        if (!confirmation) {
            return; 
        }

        try {
            const response = await $http.delete(`http://localhost:5000/api/orders/${orderId}`);

            if (response.status === 200) {
                $scope.orders = $scope.orders.filter(order => order.id !== orderId);
                console.log("Order deleted successfully");
                $scope.$apply(() => {  
                    $location.path('/admin/orders');  
                    alert("Order deleted successfully.");
                });
            } else {
                alert("Failed to delete the order.");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("An error occurred while deleting the order.");
        }
    };

    // Initialize the orders
    $scope.getAllOrders();
});
