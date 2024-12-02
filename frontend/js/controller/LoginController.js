angular.module("myApp").controller("LoginController", function ($scope, $http, $location) {
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";

    $scope.isValidInput = function () {
      if (!$scope.username || !$scope.password) {
        alert("Username dan Password harus diisi.");
        return false;
      }
      return true;
    };

    $scope.login = async function () {
      if (!$scope.isValidInput()) return;

      const loginData = {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password,
      };

      try {
        const response = await $http.post(
          "http://localhost:5000/api/login",
          loginData
        );
        console.log("Login Response:", response.data); 

        if (response.status === 200) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("isAdmin", String(response.data.isAdmin)); 
          localStorage.setItem("userId", String(response.data.id));
          
          console.log("Stored values:", {
            token: localStorage.getItem("authToken"),
            isAdmin: localStorage.getItem("isAdmin"),
            userId: localStorage.getItem("userId")
          });

          if (response.data.isAdmin === true) {
            console.log("User is admin, attempting admin redirect");
            $scope.$apply(() => {
              $location.path("/admin/users");
              alert("Login Successfully as ADMIN");
            });
          } else {
            console.log("User is not admin, redirecting to home");
            $scope.$apply(() => {
              $location.path("/home");
              alert("Login Successfully");
            });
          }
        } else {
          alert(
            response.data.error ||
            "Login failed! Please check your credentials."
          );
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("An error occurred while logging in. Please try again.");
      }
    };
});
