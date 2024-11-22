$(document).ready(function () {
    $("#buyNow").on("click", function () {
      const notification = document.createElement("div");
      notification.innerText = "Thank you for purchasing!";
      notification.classList.add("notification");
      
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
      setTimeout(function() {
        window.location.href = "/html/ShopPage.html";
      }, 2000);
    });
  });
  