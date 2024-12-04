angular
  .module("myApp")
  .controller("AdminOrderController", function ($scope, $http, $location) {
    $scope.orders = [];

    $scope.currentPage = 1;
    $scope.itemsPerPage = 6;
    $scope.filterOptions = {
      type: "",
    };
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
        return Math.ceil(($scope.filteredOrders || $scope.orders).length / $scope.itemsPerPage);
      };
      
      $scope.getPaginatedOrders = function () {
        const ordersToDisplay = $scope.filteredOrders || $scope.orders;
        const startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        return ordersToDisplay.slice(startIndex, endIndex);
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
      const confirmation = confirm(
        "Are you sure you want to delete this order?"
      );
      if (!confirmation) {
        return;
      }

      try {
        const response = await $http.delete(
          `http://localhost:5000/api/orders/${orderId}`
        );

        if (response.status === 200) {
          $scope.orders = $scope.orders.filter((order) => order.id !== orderId);
          console.log("Order deleted successfully");
          $scope.$apply(() => {
            $location.path("/admin/orders");
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

    $scope.applyFilter = function () {
        // Initialize filteredOrders if it doesn't exist
        $scope.filteredOrders = $scope.filteredOrders || [];
      
        if (!$scope.filterOptions.type) {
          $scope.filteredOrders = $scope.orders;
          return;
        }
      
        let filteredOrders = [...$scope.orders];
      
        switch ($scope.filterOptions.type) {
          case "id_Desc":
            filteredOrders.sort((a, b) => b.id - a.id);
            break;
          case "id_Asc":
            filteredOrders.sort((a, b) => a.id - b.id);
            break;
          case "userDesc":
            filteredOrders.sort((a, b) => b.userId - a.userId);
            break;
          case "userAsc":
            filteredOrders.sort((a, b) => a.userId - b.userId);
            break;
          case "priceLowHigh":
            filteredOrders.sort((a, b) => a.productPrice - b.productPrice);
            break;
          case "priceHighLow":
            filteredOrders.sort((a, b) => b.productPrice - a.productPrice);
            break;
        }
      
        $scope.filteredOrders = filteredOrders;
        $scope.currentPage = 1; // Reset to first page
      };

    $scope.clearFilter = function () {
        $scope.filterOptions.type = "";
        $scope.filteredOrders = $scope.orders;
        $scope.currentPage = 1;
      };

    $scope.getAllOrders();
  });
