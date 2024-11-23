angular.module("myApp").controller("ProfileController", function($scope, $http, $location) {
    $scope.userProfile = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        BOD: "",
        gender: ""
    };

    const token = localStorage.getItem('authToken');

    $scope.getUserProfile = async function() {
        try {
            const response = await $http.get("http://localhost:5000/api/profile", {
                headers: {
                    'Authorization': 'Bearer ' + token
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

    $scope.logout = async function() {
        if (!token) {
            alert("No token found. Please log in again.");
            return;
        }
        try {
            const response = await $http.post("http://localhost:5000/api/logout", {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('authToken');
                $location.path('/');  
                console.log("Logout Successfully")
            } else {
                alert("Failed to logout.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging out.");
        }
    }
    
    $scope.getUserProfile();
});
