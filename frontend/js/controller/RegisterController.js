angular.module('myApp').controller('RegisterController', function($scope, $http, $location) {
    $scope.user = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        BOD: "",
        gender: "",
        address: ""
    };

    $scope.register = async function() {
        if ($scope.user.password !== $scope.user.confirmPassword) {
            alert("Password and Confirm Password don't match");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test($scope.user.password)) {
            alert("Passwords must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.");
            return;
        }

        try {
            const response = await $http.post("http://localhost:5000/api/users", {
                username: $scope.user.username,
                email: $scope.user.email,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword,
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                BOD: $scope.user.BOD,
                gender: $scope.user.gender,
                address: $scope.user.address
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
