angular.module("myApp").controller("ProfileController", function($scope, $http, $location) {
    $scope.userProfile = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        BOD: "",
        gender: ""
    };

    $scope.passwordData = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    };

    const token = localStorage.getItem('authToken');

    $scope.isLoading = false;

    $scope.getUserProfile = async function() {
        $scope.isLoading = true;  

        const cachedProfile = localStorage.getItem('userProfile');
        if (cachedProfile) {
            $scope.userProfile = JSON.parse(cachedProfile);  
            $scope.isLoading = false;
            return;
        }
        try {
            const response = await $http.get("http://localhost:5000/api/profile", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status === 200) {
                $scope.userProfile = response.data;
                localStorage.setItem('userProfile', JSON.stringify(response.data));  
            } else {
                alert("Failed to load profile.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching the user profile.");
        } finally {
            $scope.isLoading = false;  
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
                localStorage.removeItem('userProfile');  
                $location.path('/');  
                console.log("Logout Successfully")
            } else {
                alert("Failed to logout.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging out.");
        }
    };

    $scope.changePassword = async function() {
        const { currentPassword, newPassword, confirmNewPassword } = $scope.passwordData;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert("All fields are required.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("New password and confirm new password don't match.");
            return;
        }

        try {
            const response = await $http.post("http://localhost:5000/api/changepassword", {
                recentPassword: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status === 200) {
                alert("Password changed successfully!");
                $scope.passwordData = {
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                };
            } else {
                alert("Failed to change password.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    $scope.deleteAccount = async function() {
        if (confirm("Are you sure you want to delete your account? This action cannot be undo.")) {
            try {
                const response = await $http.delete("http://localhost:5000/api/deleteaccount", {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.status === 200) {
                    alert("Your account has been deleted successfully.");
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userProfile');
                    $location.path('/');  
                } else {
                    alert("Failed to delete account.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while deleting the account.");
            }
        }
    };

    $scope.getUserProfile();
});
