var user = document.getElementById("username");
var logout = document.querySelector(`a[href="./index.html"]`);
//===========================================================//

logout.addEventListener("click", function () {
    localStorage.removeItem("loggedin");
})
user.innerHTML = localStorage.getItem("loggedin");
 
