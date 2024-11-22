angular.module("myApp").controller("ShopController", function ($scope) {
    $scope.toggleMenu = function () {
      $scope.isMenuActive = !$scope.isMenuActive;
    };
});