angular.module("myApp").service("authService", function($http, $location) {
    // Memeriksa apakah pengguna sudah login
    this.isLoggedIn = function() {
        return localStorage.getItem('authToken') ? true : false;
    };

    // Mengarahkan pengguna ke halaman login jika belum login
    this.checkLogin = function() {
        if (!this.isLoggedIn()) {
            $location.path('/');  // Redirect ke login jika belum login
        }
    };
});
