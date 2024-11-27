angular.module("myApp").controller("AdminController", function($scope, $http, $location) {
    $scope.users = [];

    // Function to get all users
    $scope.getAllUsers = async function() {
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

    // Function to delete a user account
    $scope.deleteAccount = async function(userId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this account?");
        
        if (confirmDelete) {
            try {
                const response = await $http.delete(`http://localhost:5000/api/deleteaccount/${userId}`);
        
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

    $scope.logout = async function() {
        const token = localStorage.getItem('authToken'); 

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
                localStorage.removeItem('userProfile');  
                $scope.$apply(() => {  
                    $location.path('/');  
                    alert("Logout Successsfully");
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
