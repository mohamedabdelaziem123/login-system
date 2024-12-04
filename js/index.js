var loginEmail = document.getElementById("signinEmail");
var loginPass = document.getElementById("signinPassword");
var loginEmailError = document.getElementById("signinEmailError");
var loginPassError = document.getElementById("signinPasswordError");
var loginError = document.getElementById("loginError");
var loginBtn = document.getElementById("login");
//==========================general==========================/

function removeValidationClasses(){
    loginEmail.classList.remove("is-valid");
    loginPass.classList.remove("is-valid"); 
}
function validation(valid,input,Error) {
    if (valid != "1") {
        input.classList.add("is-invalid");
        Error.classList.replace("d-none","d-block");
        Error.innerHTML=valid;
    }
    else {
        
        input.classList.replace("is-invalid", "is-valid");
        Error.classList.replace("d-block","d-none");
    }
}
var timezone = setInterval(function () {
    if(loginError!=null)
    loginError.innerHTML = "";
}, 7000);
function clear(){
    loginEmail.value = null;
    loginPass.value = null;
}
function invocation() {
    clear();
    removeValidationClasses();
    timezone();
    clearInterval(timezone);
}
//==========================general==========================/
//==========================global=========================//
var Users;
if (localStorage.getItem("users") == null || localStorage.getItem("user") == "[]") {
    Users = [];
    localStorage.setItem("users",JSON.stringify(Users));
}  
else
    Users = JSON.parse(localStorage.getItem("users"));
    console.log(Users);

//==========================global=========================//
function validateEmail(input) {
    var emailConstraints = {
        startsWithThreeOrMoreWordChars: /^[a-zA-Z0-9_\-]{3,}/, 
        containsAt:/^[^@]+@[\w\.]*[^@A-Za-z0-9\s]*[\w\.]*$/i, // Contains exactly one @ symbol
        validDomains: /(yahoo\.com|icloud\.com|gmail\.com)$/i, 
        noSpaces: /^\S+$/ 
    };
    if (!emailConstraints.noSpaces.test(input) ||!emailConstraints.startsWithThreeOrMoreWordChars.test(input) ||!emailConstraints.containsAt.test(input) || !emailConstraints.validDomains.test(input)) {
        return "please  enter a valid email";
    }
    return "1";
}
loginEmail.addEventListener("input", function () {
    var valid = validateEmail(this.value);
    validation(valid,this,loginEmailError);

})

function validatePassword(input) {
    var passwordConstraints = {
        minLength: /^.{8,}$/, 
        containsUppercase: /[A-Z]/,  
        containsLowercase: /[a-z]/,  
        containsNumberOrSpecial: /([0-9]|[^A-Za-z0-9\s])+/  
    };
    
    if (!passwordConstraints.minLength.test(input)||!passwordConstraints.containsUppercase.test(input)||!passwordConstraints.containsLowercase.test(input)||!passwordConstraints.containsNumberOrSpecial.test(input)) {
        return "please  enter a valid password";
    }

    return "1";  
}
loginPass.addEventListener("input", function () {
    var valid = validatePassword(this.value);
    validation(valid,this,loginPassError);

})

loginBtn.addEventListener("click", function () {

                
    if (loginPass.classList.contains("is-valid") && loginEmail.classList.contains("is-valid")) {
        var user = {
            email: loginEmail.value,
            password: loginPass.value
        }
        for (var i = 0; i < Users.length; i++) {
            if ((Users[i].email == user.email && Users[i].password == user.password)) {
                localStorage.setItem("loggedin",Users[i].username );
                loginBtn.setAttribute("href", "./home.html");
                return;
            }
            else {
                if (Users[i].email == user.email) {
                    loginError.innerHTML = "incorrect password for this email";
                    invocation();
                }   
            }
            
            
        }
        loginError.innerHTML = " enter a valid email and password";
                    invocation();
    }
    else {
        loginError.innerHTML = "please make sure to correctly fill all the information";
                    invocation();
    }
})
