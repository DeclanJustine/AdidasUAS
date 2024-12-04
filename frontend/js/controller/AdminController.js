angular
  .module("myApp")
  .controller("AdminController", function ($scope, $http, $location) {
    $scope.users = [];
    $scope.filteredUsers = [];
    $scope.currentPage = 1; // Halaman saat ini
    $scope.itemsPerPage = 12; // Jumlah data per halaman
    $scope.filterOptions = {
      type: "",
    };

    // Mengambil semua data pengguna
    $scope.getAllUsers = async function () {
      try {
        const response = await $http.get("http://localhost:5000/api/users");
        
        if (response.status === 200) {
          $scope.users = response.data;
          $scope.filteredUsers = [...$scope.users];
          $scope.updatePagination();
          console.log("Users retrieved successfully:", $scope.users);
          $scope.$apply();
        } else {
          alert("Failed to retrieve users data.");
        }
      } catch (error) {
        console.error("Error retrieving users:", error);
        alert("An error occurred while retrieving user data.");
      }
    };
   

    // Filter data pengguna
    $scope.applyFilter = function () {
      if (!$scope.filterOptions.type) {
        return;
      }

      let filteredUsers = [...$scope.users];

      switch ($scope.filterOptions.type) {
        case "id_desc":
          filteredUsers.sort((a, b) => b.id - a.id);
          break;
        case "id_asc":
          filteredUsers.sort((a, b) => a.id - b.id);
          break;
        case "username_desc":
          filteredUsers.sort((a, b) => b.username.localeCompare(a.username));
          break;
        case "username_asc":
          filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
          break;
        case "gender_m":
          filteredUsers = filteredUsers.filter((user) => user.gender === "male");
          break;
        case "gender_f":
          filteredUsers = filteredUsers.filter(
            (user) => user.gender === "female"
          );
          break;
      }

      $scope.filteredUsers = filteredUsers;
      $scope.updatePagination();
    };

    // Menghapus filter
    $scope.clearFilter = function () {
      $scope.filterOptions.type = "";
      $scope.filteredUsers = [...$scope.users];
      $scope.updatePagination();
    };

    // Pagination
    $scope.updatePagination = function () {
      const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
      const end = start + $scope.itemsPerPage;
      $scope.displayedUsers = $scope.filteredUsers.slice(start, end);
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < Math.ceil($scope.filteredUsers.length / $scope.itemsPerPage)) {
        $scope.currentPage++;
        $scope.updatePagination();
      }
    };

    $scope.previousPage = function () {
      if ($scope.currentPage > 1) {
        $scope.currentPage--;
        $scope.updatePagination();
      }
    };

    $scope.totalPages = function () {
      return Math.ceil($scope.filteredUsers.length / $scope.itemsPerPage);
    };

    // Menghapus akun pengguna
    $scope.deleteAccount = async function (userId) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this account?"
      );

      if (confirmDelete) {
        try {
          const response = await $http.delete(
            `http://localhost:5000/api/deleteaccount/${userId}`
          );

          if (response.status === 200) {
            alert(response.data.message);
            $scope.getAllUsers();
          } else {
            alert("Failed to delete user account.");
          }
        } catch (error) {
          console.error("Error deleting account:", error);
          alert("An error occurred while deleting the account.");
        }
      } else {
        console.log("Account deletion canceled.");
      }
    };

    // Logout pengguna
    $scope.logout = async function () {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      try {
        const response = await $http.post(
          "http://localhost:5000/api/logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userProfile");
          $scope.$apply(() => {
            $location.path("/");
            alert("Logout Successfully");
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

    // Inisialisasi data
    $scope.filteredUsers = [...$scope.users];
    $scope.getAllUsers();
  });
