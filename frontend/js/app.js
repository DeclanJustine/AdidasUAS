var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/frontend/html/Login.html",
            controller: "LoginController"
        })
        .when("/register", {
            templateUrl: "/frontend/html/Register.html",
            controller: "RegisterController"
        })
        .when("/admin/users", {
            templateUrl: "/frontend/html/AdminPageUser.html",
            controller: "AdminController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/admin/editUsers/:userId", {
            templateUrl: "/frontend/html/AdminEditUser.html",
            controller: "EditUserController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/admin/products", {
            templateUrl: "/frontend/html/AdminPageProduct.html",
            controller: "AdminProductController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/profile", {
            templateUrl: "/frontend/html/Profile.html",
            controller: "ProfileController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/home", {
            templateUrl: "/frontend/html/LandingPage.html",
            controller: "LandingController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/about", {
            templateUrl: "/frontend/html/AboutUsPage.html",
            controller: "AboutController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/shop", {
            templateUrl: "/frontend/html/ShopPage.html",
            controller: "ShopController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/men", {
            templateUrl: "/frontend/html/MenPage.html",
            controller: "MenController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/women", {
            templateUrl: "/frontend/html/WomenPage.html",
            controller: "WomenController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when("/kids", {
            templateUrl: "/frontend/html/KidsPage.html",
            controller: "KidsController",
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .when('/products/:type/:category/:id', {
            templateUrl: '/frontend/html/ProductDetail.html',
            controller: 'ProductDetailController',
            resolve: {
                loginRequired: function(authService) {
                    authService.checkLogin();
                }
            }
        })
        .otherwise({
            redirectTo: "/"
        });
});
