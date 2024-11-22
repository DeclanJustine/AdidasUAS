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
        .when("/home", {
            templateUrl: "/frontend/html/LandingPage.html",
            controller: "LandingController"
        })
        .when("/about", {
            templateUrl: "/frontend/html/AboutUsPage.html",
            controller: "AboutController"
        })
        .when("/shop", {
            templateUrl: "/frontend/html/ShopPage.html",
            controller: "ShopController"
        })       
        .when("/men", {
            templateUrl: "/frontend/html/MenPage.html",
            controller: "MenController"
        })    
        .when("/women", {
            templateUrl: "/frontend/html/WomenPage.html",
            controller: "WomenController"
        })    
        .when("/kids", {
            templateUrl: "/frontend/html/KidsPage.html",
            controller: "KidsController"
        })     
        .otherwise({
            redirectTo: "/"
        });
});
