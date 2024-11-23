angular.module("myApp").controller("ProfileController", function($scope, $http, $location) {
    $scope.userProfile = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        BOD: "",
        gender: ""
    };

    $scope.getUserProfile = async function() {
        try {
            const response = await $http.get("http://localhost:5000/api/profile", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });
            if (response.status === 200) {
                $scope.userProfile = response.data;
            } else {
                alert("Failed to load profile.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching the user profile.");
        }
    };

    $scope.getUserProfile();
});
