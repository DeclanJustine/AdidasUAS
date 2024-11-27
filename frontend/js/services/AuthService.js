angular.module("myApp").service("authService", function($http, $location) {
    this.isLoggedIn = function() {
        return localStorage.getItem('authToken') ? true : false;
    };

    this.checkLogin = function() {
        if (!this.isLoggedIn()) {
            $location.path('/');  
        }
    };
});
