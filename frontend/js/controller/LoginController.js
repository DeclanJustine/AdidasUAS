angular.module("myApp").controller("LoginController", function($scope, $http, $location) {
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";

    $scope.login = async function() {
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
                  const token = localStorage.getItem('authToken');
                  console.log("Token saved to localStorage", token);
              }
              $location.path("/home");
           } else {
              alert(response.data.error || "Login failed!");
           }
        } catch (error) {
           console.error("Error:", error);
           alert("Error while login! Check your password again");
        }
     };     
});
