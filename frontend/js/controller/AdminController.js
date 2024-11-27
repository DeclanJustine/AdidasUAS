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
    

    $scope.getAllUsers();
});
