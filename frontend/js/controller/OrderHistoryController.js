app.controller("OrderHistoryController", function($scope, $http, authService) {
    // Memeriksa apakah pengguna sudah login
    authService.checkLogin();

    // Mendapatkan userId dari localStorage (diasumsikan sudah disimpan setelah login)
    const userId = localStorage.getItem("userId");

    // Inisialisasi data order
    $scope.orders = [];
    $scope.errorMessage = "";

    // Mendapatkan data order history dari API
    $http.get(`http://localhost:5000/api/order/history/${userId}`)
        .then(function(response) {
            $scope.orders = response.data.data; // Properti 'data' disesuaikan
            console.log("Orders fetched:", $scope.orders); // Log untuk debugging
        })
        .catch(function(error) {
            console.error("Error fetching order history:", error);
            $scope.errorMessage = "Failed to fetch order history. Please try again later.";
        });


    // Fungsi untuk kembali ke halaman sebelumnya
    $scope.goBack = function() {
        window.history.back(); // Mengarahkan ke halaman sebelumnya
    };
});
