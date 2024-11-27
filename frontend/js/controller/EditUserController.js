angular.module("myApp").controller("EditUserController", function($scope, $http, $routeParams) {
    $scope.user = {};      
    $scope.newValues = {};  

    const userId = $routeParams.userId;

    const fetchUserData = async () => {
        try {
            const response = await $http.get(`http://localhost:5000/api/users/${userId}`);
            if (response.status === 200) {
                $scope.user = response.data;
                $scope.newValues.isAdmin = $scope.user.isAdmin;  
                console.log("User data retrieved successfully:", $scope.user);
                $scope.$apply();
            } else {
                alert("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
            alert("An error occurred while retrieving user data.");
        }
    };
    
    

    $scope.updateUser = async () => {
        console.log("Updating user with data:", $scope.newValues);  
        try {
          const response = await $http.put(`http://localhost:5000/api/edituser/${userId}`, $scope.newValues);
          if (response.status === 200) {
            alert("User data updated successfully.");
            console.log("Updated user:", response.data);
            fetchUserData();
            window.location.href = "#!/admin/users"; 
          } else {
            alert("Failed to update user data.");
          }
        } catch (error) {
          console.error("Error updating user data:", error);
          alert("An error occurred while updating user data.");
        }
      };
      
      
    fetchUserData();
});
