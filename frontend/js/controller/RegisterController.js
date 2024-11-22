angular.module('myApp').controller('RegisterController', function($scope, $http, $location) {
    $scope.user = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    $scope.register = async function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert("Password and Confirm Password doesn't match");
            return;
        }

        try {
            const response = await $http.post("http://localhost:5000/api/users", {
                username: $scope.user.username,
                email: $scope.user.email,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword,
            });

            if (response.data.message) {
                $location.path("/"); 
                alert("Registration Success!");
            }
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = error.data?.message || "An error occurred while trying to register.";
            alert(errorMessage);
        }
    };
});