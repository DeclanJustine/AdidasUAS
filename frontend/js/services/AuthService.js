angular.module("myApp").service("authService", function($location, $http) {
    this.isLoggedIn = function() {
        return !!localStorage.getItem('authToken');
    };

    this.isAdmin = function() {
        const adminStatus = localStorage.getItem('isAdmin');
        console.log("Checking admin status:", adminStatus);
        return adminStatus === 'true' || adminStatus === true;
    };

    this.checkLogin = function() {
        if (!this.isLoggedIn()) {
            console.log("Not logged in, redirecting to login");
            $location.path('/');
            return false;
        }
        return true;
    };

    this.checkAdminAccess = function() {
        console.log("Checking admin access");
        if (!this.isLoggedIn()) {
            console.log("Not logged in, redirecting to login");
            $location.path('/');
            return false;
        }
        
        if (!this.isAdmin()) {
            console.log("Not admin, redirecting to home");
            $location.path('/home');
            alert("You are not an admin.");
            return false;
        }
        
        console.log("Admin access granted");
        return true;
    };

    this.logout = function() {
        return $http.post("http://localhost:5000/api/logout").then(() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userId');
            $location.path('/');
        }).catch(error => {
            console.error('Logout error:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userId');
            $location.path('/');
        });
    };
});