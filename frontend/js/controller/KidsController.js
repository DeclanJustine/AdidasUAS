angular.module("myApp").controller("KidsController", function ($scope) {
  $scope.toggleMenu = function () {
    $scope.isMenuActive = !$scope.isMenuActive;
  };

  $scope.searchInput = "";
  $scope.searchResults = [];

  $scope.searchProducts = function () {
    const input = $scope.searchInput.toLowerCase();
    const products = document.querySelectorAll(".productItem");

    products.forEach(function (product) {
      const productName = product
        .querySelector(".productTitle")
        .textContent.toLowerCase();
      const display = productName.includes(input) ? "block" : "none";
      product.style.display = display;
    });

    $scope.searchResults = Array.from(products).filter((product) =>
      product
        .querySelector(".productTitle")
        .textContent.toLowerCase()
        .includes(input)
    );
  };

  $scope.originalProducts = [
    {
      title: "ADIDAS X STAR WARS CORE BLACK",
      price: "Rp. 2.300.000",
      image: "/frontend/assets/kidsshoes/KIDS(ORIGINAL 1) - Star Wars.png",
      link: "ProductDetail/KidsShoes/KidsOri1.html",
      subtitle: "Originals Kids",
    },
    {
      title: "ADIDAS X HELLO KITTY SUPERSTARS",
      price: "Rp. 1.288.000",
      image: "/frontend/assets/kidsshoes/KIDS(ORIGINAL 2) - Hello Kitty.png",
      link: "ProductDetail/KidsShoes/KidsOri2.html",
      subtitle: "Originals Kids",
    },
    {
      title: "ADIDAS NIZZA X DISNEY GOOFY",
      price: "Rp. 2.100.000",
      image: "/frontend/assets/kidsshoes/KIDS(ORIGINAL 3) - Disney.png",
      link: "ProductDetail/KidsShoes/KidsOri3.html",
      subtitle: "Originals Kids",
    },
    {
      title: "ADIDAS X MARVEL SPIDERMAN",
      price: "Rp. 1.100.000",
      image: "/frontend/assets/kidsshoes/KIDS(ORIGINAL 4) - Marvel Spiderman.png",
      link: "ProductDetail/KidsShoes/KidsOri4.html",
      subtitle: "Originals Kids",
    },
  ];

  $scope.sportsProducts = [
    {
      title: "ADIDAS RAPIDRAZEN X LEGO",
      price: "Rp. 2.650.000",
      image: "/frontend/assets/kidsshoes/KIDS(SPORTS 1) - Lego.png",
      link: "ProductDetail/KidsShoes/KidsSport1.html",
      subtitle: "Sports Kids",
    },
    {
      title: "ADIDAS DAME 8 X PIXAR MR INCREDIBLE",
      price: "Rp. 2.995.000",
      image: "/frontend/assets/kidsshoes/KIDS(SPORTS 2) - Incredebles.png",
      link: "ProductDetail/KidsShoes/KidsSport2.html",
      subtitle: "Sports Kids",
    },
    {
      title: "ADIDAS D.o.n X DONOVAN MITCHELL",
      price: "Rp. 1.085.000",
      image: "/frontend/assets/kidsshoes/KIDS (SPORTS 3) - Donovan Mitchell.png",
      link: "ProductDetail/KidsShoes/KidsSport3.html",
      subtitle: "Sports Kids",
    },
    {
      title: "ADIDAS A.E. 1 X ANTHONY EDWARDS",
      price: "Rp. 4.495.000",
      image: "/frontend/assets/kidsshoes/KIDS (SPORTS 4) - Anthony Edwards.png",
      link: "ProductDetail/KidsShoes/KidsSport4.html",
      subtitle: "Sports Kids",
    },
  ];

  $scope.runningProducts = [
    {
      title: "ADIDAS FORTARUN X DISNEY MINNIE MOUSE",
      price: "Rp. 1.350.000",
      image: "/frontend/assets/kidsshoes/KIDS(RUNNING 1) - Disney.png",
      link: "ProductDetail/KidsShoes/KidsRun1.html",
      subtitle: "Running Kids",
    },
    {
      title: "ADIDAS RAPIDARUN X MARVEL SPIDERMAN",
      price: "Rp. 1.399.000",
      image: "/frontend/assets/kidsshoes/KIDS(RUNNING 2) - Marvel Spiderman.png",
      link: "ProductDetail/KidsShoes/KidsRun2.html",
      subtitle: "Running Kids",
    },
    {
      title: "ADIDAS X PIXAR BUZZ LIGHTYEAR",
      price: "Rp. 883.000",
      image: "/frontend/assets/kidsshoes/KIDS(RUNNING 3) - Disney Pixar.png",
      link: "ProductDetail/KidsShoes/KidsRun3.html",
      subtitle: "Running Kids",
    },
    {
      title: "ADIDAS FORTARUN X DISNEY FROZEN",
      price: "Rp. 575.000",
      image: "/frontend/assets/kidsshoes/KIDS(RUNNING 4) - Frozen.png",
      link: "ProductDetail/KidsShoes/KidsRun4.html",
      subtitle: "Running Kids",
    },
  ];
});
