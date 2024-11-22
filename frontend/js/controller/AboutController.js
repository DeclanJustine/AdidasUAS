angular.module("myApp").controller("AboutController", function ($scope) {
  $scope.toggleMenu = function () {
    $scope.isMenuActive = !$scope.isMenuActive;
  };
});
