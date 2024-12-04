angular.module("myApp").controller("AdminOrderController", function ($scope, $http, $location) {
    $scope.orders = [];
    $scope.currentPage = 1;
    $scope.itemsPerPage = 6;

    $scope.getAllOrders = async function () {
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

    $scope.totalPages = function () {
        return Math.ceil($scope.orders.length / $scope.itemsPerPage);
    };

    $scope.getPaginatedOrders = function () {
        const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        return $scope.orders.slice(startIndex, endIndex);
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

    $scope.deleteOrder = async function (orderId) {
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

    $scope.sortOrder = 'asc';

    $scope.sortOrders = function () {
        if ($scope.sortOrder === 'idAsc') {
            $scope.orders.sort((a, b) => a.id - b.id);
        } else if ($scope.sortOrder === 'idDesc') {
            $scope.orders.sort((a, b) => b.id - a.id);
        } else if ($scope.sortOrder === 'userAsc') {
            $scope.orders.sort((a, b) => a.userId - b.userId);
        } else if ($scope.sortOrder === 'userDesc') {
            $scope.orders.sort((a, b) => b.userId - a.userId);
        } else if ($scope.sortOrder === 'priceLowHigh') {
            $scope.orders.sort((a, b) => a.productPrice - b.productPrice);
        } else if ($scope.sortOrder === 'priceHighLow') {
            $scope.orders.sort((a, b) => b.productPrice - a.productPrice);
        }
    };

    $scope.isFilterDropdownOpen = false;

    $scope.toggleFilterDropdown = function () {
        $scope.isFilterDropdownOpen = !$scope.isFilterDropdownOpen;
    };

    $scope.setSortOrder = function (order) {
        $scope.sortOrder = order;
        $scope.sortOrders();
        $scope.isFilterDropdownOpen = false;
    };

    $scope.getAllOrders();
});
