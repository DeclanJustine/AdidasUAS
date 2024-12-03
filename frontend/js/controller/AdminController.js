angular
  .module("myApp")
  .controller("AdminController", function ($scope, $http, $location) {
    $scope.users = [];
    $scope.filterOptions = {
      type: "",
    };

    $scope.getAllUsers = async function () {
      try {
        const response = await $http.get("http://localhost:5000/api/users");

        if (response.status === 200) {
          $scope.users = response.data;
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

    $scope.applyFilter = function () {
      if (!$scope.filterOptions.type) {
        return;
      }

      
      let filteredUsers = [...$scope.users];

      switch ($scope.filterOptions.type) {
        case "id_desc":
          filteredUsers.sort((a, b) => b.id - a.id);
          break;
        case "username_desc":
          filteredUsers.sort((a, b) => b.username.localeCompare(a.username));
          break;
        case "gender_m-f":
          filteredUsers.sort((a, b) => b.gender.localeCompare(a.gender));
          break;
        case "gender_f-m":
          filteredUsers.sort((a, b) => a.gender.localeCompare(b.gender));
          break;
      }

      $scope.users = filteredUsers;
    };

    $scope.clearFilter = function () {
      $scope.filterOptions.type = "";
      $scope.getAllUsers(); 
    };

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

    $scope.getAllUsers();
  });
