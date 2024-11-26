angular.module("myApp").controller("AdminController", function($scope, $http) {
    $scope.users = [];

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
    

    $scope.deleteUser = async function(userId) {
        try {
            const response = await $http.delete(`http://localhost:5000/api/users/${userId}`);
            if (response.status === 200) {
                $scope.getAllUsers();
                console.log("User deleted successfully.");
            } else {
                alert("Failed to delete the user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    };

    $scope.getAllUsers();
});
