angular
  .module("myApp")
  .controller("WomenController", function ($scope, $window) {
    $scope.toggleMenu = function () {
      $scope.isMenuActive = !$scope.isMenuActive;
    };

    $scope.moveSlide = function (sectionId, direction) {
      const container = document.querySelector(
        `#${sectionId} .productContainer`
      );
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
        title: "ADIDAS X STELLA MCCARTNEY COURT SLIP",
        price: "Rp. 2.600.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(ORIGINAL 1) - Stella McCartney.png",
        link: "ProductDetail/WomenShoes/WemenOri1.html",
      },
      {
        title: "ADIDAS SUPERSTARS X OLIVIA OBLANC",
        price: "Rp. 1.905.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(ORIGINAL 2) - Olivia Oblanc.png",
        link: "ProductDetail/WomenShoes/WomenOri2.html",
      },
      {
        title: "ADIDAS X THEBE MAGUGU WHITE PULSE",
        price: "Rp. 2.061.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(ORIGINAL 3) - Thebe Magugu.png",
        link: "ProductDetail/WomenShoes/WomenOri3.html",
      },
      {
        title: "ADIDAS X FARM RIO",
        price: "Rp. 1.100.000",
        image: "/frontend/assets/womenshoes/WOMAN(ORIGINAL 4) - Farm Rio.png",
        link: "ProductDetail/WomenShoes/WomenOri4.html",
      },
      {
        title: "ADIDAS X HATTIE STEWART",
        price: "Rp. 1.499.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(ORIGINAL 5) - Hattie Stewart.png",
        link: "ProductDetail/WomenShoes/WomenOri5.html",
      },
      {
        title: "ADIDAS X RITA ORA",
        price: "Rp. 3.370.000",
        image: "/frontend/assets/womenshoes/WOMAN(ORIGINAL 6) - Rita Ora.png",
        link: "ProductDetail/WomenShoes/WomenOri6.html",
      },
      {
        title: "ADIDAS SUPERSTARS X STAN SMITH",
        price: "Rp. 1.700.000",
        image: "/frontend/assets/womenshoes/WOMAN(ORIGINAL 7) - Stan Smith.png",
        link: "ProductDetail/WomenShoes/WomenOri7.html",
      },
      {
        title: "ADIDAS SAMBA NYLON X WALES BONNER",
        price: "Rp. 4.995.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(ORIGINAL 8) - Wales Bonner.png",
        link: "ProductDetail/WomenShoes/WomenOri8.html",
      },
    ];

    $scope.sportsProducts = [
      {
        title: "ADIDAS ULTRABOOST OG X IVY PARK",
        price: "Rp. 1.999.000",
        image: "/frontend/assets/womenshoes/WOMAN(SPORTS 1) - Ivy Park.png",
        link: "ProductDetail/WomenShoes/WomenSport1.html",
      },
      {
        title: "ADIDAS SAMBA X PHARRELL WILLIAMS HUMANRACE",
        price: "Rp. 3.799.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(SPORTS 2) - Pharrell WIlliams.png",
        link: "ProductDetail/WomenShoes/WomenSport2.html",
      },
      {
        title: "ADIDAS X KARLIE KLOSS X9000",
        price: "Rp. 2.178.000",
        image: "/frontend/assets/womenshoes/WOMAN(SPORTS 3) - Karlie Kloss.png",
        link: "ProductDetail/WomenShoes/WomenSport3.html",
      },
      {
        title: "ADIDAS ULTRABOOST X MARIMEKKO",
        price: "Rp. 3.200.000",
        image: "/frontend/assets/womenshoes/WOMAN(SPORTS 4) - Marimekko.png",
        link: "ProductDetail/WomenShoes/WomenSport4.html",
      },
      {
        title: "ADIDAS PUREMOTION X ZOE SALDANA",
        price: "Rp. 898.000",
        image: "/frontend/assets/womenshoes/WOMAN(SPORTS 5) - Zoe Saldana.png",
        link: "ProductDetail/WomenShoes/WomenSport5.html",
      },
      {
        title: "ADIDAS X CANDACE PARKER CARBON WHITE",
        price: "Rp. 1.801.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(SPORTS 6) - Candace Parker.png",
        link: "ProductDetail/WomenShoes/WomenSport6.html",
      },
      {
        title: "ADIDAS PREDATOR FREAK X STELLA MCCARTNEY",
        price: "Rp. 3.613.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(SPORTS 7) - Stella McCartney.png",
        link: "ProductDetail/WomenShoes/WomenSport7.html",
      },
      {
        title: "ADIDAS X STELLA MCCARTNEY",
        price: "Rp. 3.386.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(SPORTS 8) - Stella McCartney.png",
        link: "ProductDetail/WomenShoes/WomenSport8.html",
      },
    ];

    $scope.runningProducts = [
      {
        title: "ADIDAS OZWEEGO 3 X RAF SIMONS",
        price: "Rp. 4.653.000",
        image: "/frontend/assets/womenshoes/WOMEN(RUNNING 1) - Raf Simons.png",
        link: "ProductDetail/WomenShoes/WomenRun1.html",
      },
      {
        title: "ADIDAS OZWEEGO X PUSHA T CRYSTAL WHITE",
        price: "Rp. 1.862.000",
        image: "/frontend/assets/womenshoes/WOMAN(RUNNING 2) - Pusha T.png",
        link: "ProductDetail/WomenShoes/WomenRun2.html",
      },
      {
        title: "ADIDAS FALCON ZIP X FIORUCCI",
        price: "Rp. 1.300.000",
        image: "/frontend/assets/womenshoes/WOMAN(RUNNING 3) - FIORUCCI.png",
        link: "ProductDetail/WomenShoes/WomenRun3.html",
      },
      {
        title: "ADIDAS ULTRABOOST 1.0 X UNDEFEATED",
        price: "Rp. 2.393.000",
        image: "/frontend/assets/womenshoes/WOMAN(RUNNING 4) - Undefeated.png",
        link: "ProductDetail/WomenShoes/WomenRun4.html",
      },
      {
        title: "ADIDAS PULSEBOOST HD X MISSONI",
        price: "Rp. 4.504.000",
        image: "/frontend/assets/womenshoes/WOMAN(RUNNING 5) - Missoni.png",
        link: "ProductDetail/WomenShoes/WomenRun5.html",
      },
      {
        title: "ADIDAS ULTRABOOST 22 X IVY PARK",
        price: "Rp. 1.785.000",
        image: "/frontend/assets/womenshoes/WOMAN(RUNNING 6) - Ivy Park.png",
        link: "ProductDetail/WomenShoes/WomenRun6.html",
      },
      {
        title: "ADIDAS X STELLA MCCARTNEY BAD BUNNY ULTRABOOST",
        price: "Rp. 3.048.000",
        image: "/frontend/assets/womenshoes/WOMAN(RUNNING 7) - Parley.png",
        link: "ProductDetail/WomenShoes/WomenRun7.html",
      },
      {
        title: "ADIDAS SOLARBOOST 5 X GIRLS ARE AWESOME",
        price: "Rp. 2.219.000",
        image:
          "/frontend/assets/womenshoes/WOMAN(RUNNING 8) - Girls Are Awesome SolarBoost.png",
        link: "ProductDetail/WomenShoes/WomenRun8.html",
      },
    ];
  });
