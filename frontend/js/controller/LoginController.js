angular.module("myApp").controller("LoginController", function($scope, $http, $location) {
   $scope.username = "";
   $scope.email = "";
   $scope.password = "";

   $scope.isValidInput = function() {
       if (!$scope.username || !$scope.password) {
           alert("Username dan Password harus diisi.");
           return false;
       }
       return true;
   };

   $scope.login = async function() {
       if (!$scope.isValidInput()) return;

       const loginData = {
           username: $scope.username,
           email: $scope.email,
           password: $scope.password
       };

       try {
           const response = await $http.post("http://localhost:5000/api/login", loginData);
           console.log('Response:', response);

           if (response.status === 200) {
               if (response.data.token) {
                   localStorage.setItem('authToken', response.data.token);
                   console.log("Token saved to localStorage", response.data.token);
               }

               if (response.data.isAdmin === true) {
                   console.log("Admin user, redirecting to Admin Page");
                   $location.path("/admin/users");
               } else {
                   console.log("Regular user, redirecting to Home Page");
                   $location.path("/home");
               }
           } else {
               alert(response.data.error || "Login failed! Please check your credentials.");
           }
       } catch (error) {
           console.error("Error:", error);
           alert("An error occurred while logging in. Please try again.");
       }
   };
});
