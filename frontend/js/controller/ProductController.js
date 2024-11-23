angular.module("myApp").controller("ProductController", function ($scope) {
    $scope.toggleMenu = function () {
        $scope.isMenuActive = !$scope.isMenuActive;
    };
  
    $scope.buyNow = function () {
        const notification = document.createElement("div");
        notification.innerText = "Thank you for purchasing!";
        notification.classList.add("notification");
        
        document.body.appendChild(notification);
    
        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 1500);
  
        setTimeout(function() {
            window.location.href = "#!/shop";
        }, 1500);
    };
  });
  