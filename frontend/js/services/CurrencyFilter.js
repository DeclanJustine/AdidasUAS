angular.module("myApp").filter("currencyRp", function() {
    return function(input) {
        if (isNaN(input)) return input; 
        return "Rp " + input.toLocaleString(); 
    };
});
