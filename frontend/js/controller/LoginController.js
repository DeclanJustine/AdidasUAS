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

            if (response.status === 200) {
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