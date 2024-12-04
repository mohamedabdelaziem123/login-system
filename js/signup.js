//=============================start=======================//
var signName = document.getElementById("signupname");
var signEmail = document.getElementById("signupEmail");
var signPass = document.getElementById("signupPassword");
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passError = document.getElementById("passError");
var signupBtn = document.getElementById("signup");
var signupError = document.getElementById("incorrect");
var toLogin = document.querySelector("a.text-white");
//==========================login page========================//
var loginEmail = document.getElementById("signinEmail");
var loginPass = document.getElementById("signinPassword");
var loginEmailError = document.getElementById("signinEmailError");
var loginPassError = document.getElementById("signinPasswordError");
var loginError = document.getElementById("loginError");
//============================ general===================//
// localStorage.clear();
//==========================global=========================//
var Users;
if (localStorage.getItem("users") == null || localStorage.getItem("user") == "[]") {
    Users = [];
    localStorage.setItem("users",JSON.stringify(Users));
}  
else
    Users = JSON.parse(localStorage.getItem("users"));

//==========================global=========================//
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
function clear() {
    signName.value = null;
    signEmail.value = null;
    signPass.value = null;
}
function removeValidationClasses(){
    signName.classList.remove("is-valid");
    signEmail.classList.remove("is-valid");
    signPass.classList.remove("is-valid"); 
}
var timezone = setInterval(function () {
    if(signupError!=null)
    signupError.innerHTML = "";
}, 7000);

function invocation() {
    clear();
    removeValidationClasses();
    timezone();
    clearInterval(timezone);
}
function signedUp() {
    toLogin.click();
    clear();
}
//============================ general===================//
//===========================validation======================//
function validateName(input) {
    const nameConstraints = {
        startsWithLetter: /^[A-Za-z]/,
        containsAtLeastOneNumber: /[0-9]/,
        minLength: 8,
        nameRegex: /^[A-Za-z]+[0-9]*[A-Za-z_0-9\-]*$/
    };
    if (!nameConstraints.startsWithLetter.test(input)) {
        return "Name must start with a letter.";
    }
    if (!nameConstraints.nameRegex.test(input)) {
        return "Name sholudn’t contains space or special character";
    }
    if (!nameConstraints.containsAtLeastOneNumber.test(input)) {
        return "Name must contain at least one number.";
    }
    
    if (input.length < nameConstraints.minLength) {
        return "Name must be at least 8 characters long.";
    }
    return "1";
    //  - and _ are both accepted
}
signName.addEventListener("input", function () {
    var valid = validateName(this.value);
    console.log(this.id);
    validation(valid,this,nameError);

    
})

function validateEmail(input) {
    var emailConstraints = {
        startsWithThreeOrMoreWordChars: /^[a-zA-Z0-9_\-]{3,}/, 
        containsAt:/^[^@]+@[\w\.]*[^@A-Za-z0-9\s]*[\w\.]*$/i, // Contains exactly one @ symbol
        validDomains: /(yahoo\.com|icloud\.com|gmail\.com)$/, 
        noSpaces: /^\S+$/ 
    };
    if (!emailConstraints.noSpaces.test(input)) {
        return "Email should not contain spaces.";
    }
    if (!emailConstraints.startsWithThreeOrMoreWordChars.test(input)) {
        return "Email must start with at least 3  letters or numbers.";
    }

    if (!emailConstraints.containsAt.test(input)) {
        return "Email must contain exactly one '@' symbol.";
    }

    if (!emailConstraints.validDomains.test(input)) {
        return "Email must be @ yahoo.com, icloud.com, or gmail.com";
    }

    return "1";
}
signEmail.addEventListener("input", function () {
    var valid = validateEmail(this.value);
    validation(valid,this,emailError);

})

function validatePassword(input) {
    var passwordConstraints = {
        minLength: /^.{8,}$/, 
        containsUppercase: /[A-Z]/,  
        containsLowercase: /[a-z]/,  
        containsNumberOrSpecial: /([0-9]|[^A-Za-z0-9\s])+/  
    };
    
    if (!passwordConstraints.minLength.test(input)) {
        return "Password must be at least 8 characters long.";
    }
    if (!passwordConstraints.containsUppercase.test(input)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!passwordConstraints.containsLowercase.test(input)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!passwordConstraints.containsNumberOrSpecial.test(input)) {
        return "Password must contain at least one number or special character.";
    }
    return "1";  
}
signPass.addEventListener("input", function () {
    var valid = validatePassword(this.value);
    validation(valid,this,passError);

})
//===========================validation======================//
//===========================signup=========================//
signupBtn.addEventListener("click", function () {
    if (signName.classList.contains("is-valid") && signPass.classList.contains("is-valid") && signEmail.classList.contains("is-valid")) {
        var user = {
            username: signName.value,
            email: signEmail.value,
            password:signPass.value
        }
        
        for (var i = 0; i < Users.length; i++){
            if (Users[i].username == user.username && Users[i].email == user.email) {

                signupError.innerHTML = "username and email are already used";
                invocation();
                return;
            }
            else {
                if (Users[i].username == user.username) {
                    
                    signupError.innerHTML = "username is already used";
                    invocation();
                    return;
                }
                else {
                    if (Users[i].email == user.email) {

                        signupError.innerHTML = "email is already used";
                        invocation();
                        return;
                    }
                }
            }
            
        }
            Users.push(user);
            localStorage.setItem("users", JSON.stringify(Users));
            signedUp();
            
        
    }
    else {
        signupError.innerHTML = "please make sure to correctly fill all the information";
        timezone();
        clearInterval(timezone);
    }
})