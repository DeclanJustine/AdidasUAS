angular.module("myApp").controller("WomenController", function ($scope, $window, $http) {
  $scope.originalProducts = [];
  $scope.sportsProducts = [];
  $scope.runningProducts = [];
  $scope.isMenuActive = false;

  const initializeProducts = async () => {
    try {
      const response = await $http.get('http://localhost:5000/api/products');
      const allProducts = response.data.products;

      $scope.originalProducts = allProducts.filter(product => 
        product.type === 'women' && product.category === 'originals'
      );

      $scope.sportsProducts = allProducts.filter(product => 
        product.type === 'women' && product.category === 'sports'
      );

      $scope.runningProducts = allProducts.filter(product => 
        product.type === 'women' && product.category === 'running'
      );

      $scope.$apply();

      console.log('Originals:', $scope.originalProducts);
      console.log('Sports:', $scope.sportsProducts);
      console.log('Running:', $scope.runningProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  initializeProducts();

  $scope.toggleMenu = function () {
    $scope.isMenuActive = !$scope.isMenuActive;
  };

  $scope.moveSlide = function (sectionId, direction) {
    const container = document.querySelector(`#${sectionId} .productContainer`);
    if (!container) return;

    const items = container.children;
    if (!items.length) return;

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
    if (!input) {
      $scope.searchResults = [];
      return;
    }

    const allProducts = [
      ...$scope.originalProducts,
      ...$scope.sportsProducts,
      ...$scope.runningProducts
    ];

    $scope.searchResults = allProducts.filter(product =>
      product.name.toLowerCase().includes(input)
    ).map(product => ({
      link: `#!/products/women/${product.category}/${product.id}`,
      image: product.image,
      subtitle: `Women's ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
      title: product.name,
      price: `Rp ${product.price.toLocaleString('id-ID')}`
    }));
  };

  angular.element($window).on("resize", function () {
    ["section2", "section3", "section4"].forEach((sectionId) => {
      const container = document.querySelector(
        `#${sectionId} .productContainer`
      );
      if (container) {
        container.style.transform = "translateX(0)";
        container.dataset.currentSlide = 0;
      }
    });
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  });
});
