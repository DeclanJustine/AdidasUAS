angular.module("myApp").controller("LandingController", function($scope, $interval) {
    $scope.categories = [
        {
            title: "Original Shoes",
            description: "For those who love classic touches and top quality. Original Adidas shoes are a choice that can never go wrong.",
            images: [
                "/frontend/assets/homepage/Original1(HumanMade).png",
                "/frontend/assets/homepage/Original2(Gucci).png",
                "/frontend/assets/homepage/Original3(Beyonce).png",
                "/frontend/assets/homepage/Original4(BadBunny).png"
            ]
        },
        {
            title: "Sport Shoes",
            description: "Specifically designed to support sports performance, these collaborative sports shoes offer maximum comfort and support.",
            images: [
                "/frontend/assets/homepage/Sport1(TraeYoung).png",
                "/frontend/assets/homepage/Sport2(DamianLillard).png",
                "/frontend/assets/homepage/Sport3(Messi).png",
                "/frontend/assets/homepage/Sport4(Yeezy).png"
            ]
        },
        {
            title: "Running Shoes",
            description: "Adidas running shoes are designed for optimal performance, combining lightweight materials with durability to withstand your toughest workouts.",
            images: [
                "/frontend/assets/homepage/Running1(Nasa).png",
                "/frontend/assets/homepage/Running2(AllBirds).png",
                "/frontend/assets/homepage/Running3(Parley).png",
                "/frontend/assets/homepage/Running4(Wood).png"
            ]
        },
        {
            title: "Kids Shoes",
            description: "A combination of cool style and extra comfort for active kids. Perfect for every adventure they start on. A great choice for modern parents.",
            images: [
                "/frontend/assets/homepage/Kids1(Disney).png",
                "/frontend/assets/homepage/Kids2(Lego).png",
                "/frontend/assets/homepage/Kids3(HelloKitty).png",
                "/frontend/assets/homepage/Kids4(Marvel).png"
            ]
        }
    ];

    $scope.slides = [
        {
            image: "/frontend/assets/influencer/PharrellWilliams.png",
            title: "Pharrell Williams",
            description: `Pharrell Williams has consistently spoken positively about his collaboration with Adidas, particularly through his Humanrace™ line. His partnership with Adidas has resulted in iconic sneakers like the Hu NMD and, more recently, the Humanrace Sichona and Samba collections. Pharrell often praises Adidas for its willingness to innovate while honoring the heritage of classic designs, such as the Samba. The premium materials and thoughtful design details of these collections highlight both brands' commitment to blending style, comfort, and cultural relevance. <br>- Adidas Hu NMD S1 RYAT`
        },
        {
            image: "/frontend/assets/influencer/Beyonce.png",
            title: "Beyoncé",
            description: `Beyoncé partnered with Adidas to relaunch her Ivy Park brand. She has spoken highly of the collaboration, emphasizing how Adidas supported her vision of blending performance and lifestyle apparel. Beyoncé praised the brand for embracing creativity and innovation, which allowed her to create inclusive, body-positive designs. <br>- Adidas X Ivy Park Super Sleek Chunky Sneakers`
        },
        {
            image: "/frontend/assets/influencer/DavidBeckham.png",
            title: "David Beckham",
            description: `As a long-time Adidas partner, Beckham has always praised the brand's quality and attention to detail. His signature Predator football boots became iconic, and Beckham often credits Adidas for allowing him to work closely on the designs, making them both functional and stylish. <br>- Adidas Predator Pulse FG`
        },
        {
            image: "/frontend/assets/influencer/JamesHarden.png",
            title: "James Harden",
            description: `NBA superstar James Harden's signature line of basketball shoes with Adidas has been a success both on and off the court. He frequently highlights Adidas' focus on performance and comfort, as well as their willingness to incorporate his personality into the designs <br>- Adidas Harden Vol 7`
        }
    ];

    $scope.currentIndex = [0, 0, 0, 0];
    $scope.currentSlide = 0;
    
    $scope.toggleMenu = function() {
        $scope.isMenuActive = !$scope.isMenuActive;
    };

    $scope.changeSlide = function(categoryIndex, direction) {
        $scope.currentIndex[categoryIndex] = 
            ($scope.currentIndex[categoryIndex] + direction + $scope.categories[categoryIndex].images.length) % 
            $scope.categories[categoryIndex].images.length;
    };

    $scope.prevSlide = function(categoryIndex) {
        $scope.changeSlide(categoryIndex, -1);
    };

    $scope.nextSlide = function(categoryIndex) {
        $scope.changeSlide(categoryIndex, 1);
    };

    $scope.nextTestimonial = function() {
        $scope.currentSlide = ($scope.currentSlide + 1) % $scope.slides.length;
    };

    $scope.prevTestimonial = function() {
        $scope.currentSlide = ($scope.currentSlide - 1 + $scope.slides.length) % $scope.slides.length;
    };

    $interval(function() {
        $scope.nextTestimonial();
    }, 5000);
});