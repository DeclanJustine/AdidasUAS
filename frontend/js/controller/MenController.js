angular.module("myApp").controller("MenController", function ($scope, $window) {
  $scope.toggleMenu = function () {
    $scope.isMenuActive = !$scope.isMenuActive;
  };

  $scope.moveSlide = function (sectionId, direction) {
    const container = document.querySelector(`#${sectionId} .productContainer`);
    const items = container.children;

    let visibleItems;
    if ($window.innerWidth >= 1200) {
      visibleItems = 4;
    } else if ($window.innerWidth >= 768) {
      visibleItems = 2;
    } else if ($window.innerWidth >= 576) {
      visibleItems = 2;
    } else {
      visibleItems = 1;
    }

    const totalSlides = Math.ceil(items.length / visibleItems);
    let currentSlide = parseInt(container.dataset.currentSlide || 0);
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    container.dataset.currentSlide = currentSlide;
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

  angular.element($window).on("resize", function () {
    ["section1", "section2", "section3", "section4"].forEach((sectionId) => {
      const container = document.querySelector(
        `#${sectionId} .productContainer`
      );
      if (container) {
        container.style.transform = "translateX(0)";
        container.dataset.currentSlide = 0;
      }
    });
    $scope.$apply();
  });

  $scope.originalProducts = [
    {
      title: "ADIDAS X STAN SMITH",
      price: "Rp. 1.530.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 1) - Stan Smith.png",
      link: "#!/menori1",
    },
    {
      title: "ADIDAS X PHARRELL WILLIAMS",
      price: "Rp. 1.370.000",
      image:
        "/frontend/assets/menshoes/MAN(ORIGINAL 2) - Pharrell Williams (Superstar).png",
      link: "ProductDetail/MenShoes/MenOri2.html",
    },
    {
      title: "ADIDAS YEEZY X KANYE WEST POWERPHASE",
      price: "Rp. 1.600.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 3) - Kanye West(PowerPhase).png",
      link: "ProductDetail/MenShoes/MenOri3.html",
    },
    {
      title: "ADIDAS X SEAN WOTHERSPOON",
      price: "Rp. 2.499.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 4) - Sean Wotherspoon.png",
      link: "ProductDetail/MenShoes/MenOri4.html",
    },
    {
      title: "ADIDAS SUPERSTARS X PALACE SKATEBOARDS",
      price: "Rp. 1.800.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 5) - Palace Skateboards.png",
      link: "ProductDetail/MenShoes/MenOri5.html",
    },
    {
      title: "ADIDAS X ALEXANDER WANG SKATE SUPER",
      price: "Rp. 10.172.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 6) - Alexander Wang.png",
      link: "ProductDetail/MenShoes/MenOri6.html",
    },
    {
      title: "ADIDAS SUPERSTARS X A BATHING APE ",
      price: "Rp. Rp. 4.299.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 7) - Bappe.png",
      link: "ProductDetail/MenShoes/MenOri7.html",
    },
    {
      title: "ADIDAS X GAZELLE NEIGHBORHOOD",
      price: "Rp. 2.100.000",
      image: "/frontend/assets/menshoes/MAN(ORIGINAL 8) - Neighboorhood.png",
      link: "ProductDetail/MenShoes/MenOri8.html",
    },
  ];

  $scope.sportsProducts = [
    {
      title: "ADIDAS X HUMAN MADE COUNTRY",
      price: "Rp. 1.949.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 1) - COUNTRY HUMAN MADE.png",
      link: "ProductDetail/MenShoes/MenSport1.html",
    },
    {
      title: "ADIDAS CRAZYFAST X PRADA",
      price: "Rp. 7.580.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 2) - Prada.png",
      link: "ProductDetail/MenShoes/MenSport2.html",
    },
    {
      title: "ADIDAS X STELLA MCCARTNEY DROPSET",
      price: "Rp. 2.600.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 3) - Stella McCartney.png",
      link: "ProductDetail/MenShoes/MenSport3.html",
    },
    {
      title: "ADIDAS X DFB",
      price: "Rp. 1.650.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 4) - DFB.png",
      link: "ProductDetail/MenShoes/MenSport4.html",
    },
    {
      title: "ADIDAS SAMBA X MANCHESTER UNITED",
      price: "Rp. 2.499.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 5) - Manchester United.png",
      link: "ProductDetail/MenShoes/MenSport5.html",
    },
    {
      title: "ADIDAS ULTRABOOST DNA X REAL MADRID",
      price: "Rp. 2.199.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 6) - Real Madrid.png",
      link: "ProductDetail/MenShoes/MenSport6.html",
    },
    {
      title: "ADIDAS CRAYOLA X D.o.n. DONOVAN MITCHELL",
      price: "Rp. 1.497.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 7) - Donovan Mitchell.png",
      link: "ProductDetail/MenShoes/MenSport7.html",
    },
    {
      title: "ADIDAS ZX X JUVENTUS",
      price: "Rp. 1.050.000",
      image: "/frontend/assets/menshoes/MAN(SPORT 8) - Juventus.png",
      link: "ProductDetail/MenShoes/MenSport8.html",
    },
  ];

  $scope.runningProducts = [
    {
      title: "ADIDAS ULTRABOOST DNA X PARLEY",
      price: "Rp. 2.492.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 1) - Parley.png",
      link: "ProductDetail/MenShoes/MenRun1.html",
    },
    {
      title: "ADIDAS ZX X REBOOK",
      price: "Rp. 4.426.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 2) - Rebook.png",
      link: "ProductDetail/MenShoes/MenRun2.html",
    },
    {
      title: "ADIDAS NITE JOGGER X WHITE MOUNTAINEERING",
      price: "Rp. 2.470.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 3) - White Mountaineering.png",
      link: "ProductDetail/MenShoes/MenRun3.html",
    },
    {
      title: "ADIDAS X YOHJI YAMAMOTO Y3",
      price: "Rp. 1.667.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 4) - Yohji Yamamoto.png",
      link: "ProductDetail/MenShoes/MenRun4.html",
    },
    {
      title: "ADIDAS ALPHABOUNCE X KOLOR",
      price: "Rp. 2.100.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 5) - Kolor.png",
      link: "ProductDetail/MenShoes/MenRun5.html",
    },
    {
      title: "ADIDAS ULTRABOOST X UNDEFEATED",
      price: "Rp. 6.610.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 6) - Undefeated.png",
      link: "ProductDetail/MenShoes/MenRun6.html",
    },
    {
      title: "ADIDAS ULTRABOOST X A KIND OF GUISE",
      price: "Rp. 3.335.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 7) - A Kind of Guise.png",
      link: "ProductDetail/MenShoes/MenRun7.html",
    },
    {
      title: "ADIDAS ULTRA 4D 2.0 X PACKER",
      price: "Rp. 5.200.000",
      image: "/frontend/assets/menshoes/MAN(RUNNING 8) - Packer.png",
      link: "ProductDetail/MenShoes/MenRun8.html",
    },
  ];
});
