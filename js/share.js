$('#mail-receiving').on('input',function(e){
    $('#share-form').attr("action",`mailto:${$(e.target).val()}`)
    console.log("hola")
});

/* Validation functions */

const validateNotEmpty = (text) => {
    return !(text.trim() == "" || text.trim() == null || text.trim().length == 0);
}

const validateEmail = (email) => {
    let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
}

// Obligatorio y con el formato adecuado, por ejemplo: 'example@gmail.com'
const checkEmail = (e) =>  {
    let userInput = email.value;

    let isValid = validateNotEmpty(userInput) && validateEmail(userInput);
    if (isValid) {
        invalidEmail.classList.add("invisible");
        email.classList.remove("input-invalid");
    } else {
        invalidEmail.classList.remove("invisible");
        email.classList.add("input-invalid");
    }

    return isValid;
}

/* Form fields*/

const email = document.getElementById("mail");
const invalidEmail = document.getElementById("invalid-mail");

/* Add validations to fields */


