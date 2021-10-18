
/* URL value */
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id"); 
const host = window.location.protocol + "//" + window.location.host;
const urlShare = `${host}/html/recipe.html?id=${recipeId}`
const title = urlParams.get("title");


document.getElementById("hello-menssage").value = `I want to share this with you: \n${title} - ${urlShare}`;

document.getElementById('hello-menssage').readOnly = true;

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

const email = document.getElementById("email");
const invalidEmail = document.getElementById("invalid-mail");

/* Add validations to fields */

email.addEventListener("input", checkEmail);

/* Formulario */

const form = document.querySelector('#share-form');
const buttonMailto = document.querySelector('#eventSendMail');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this);

    const isEmailValid = checkEmail();

    if (isEmailValid) {
        const subject = `${title} - Prodiet`;
        const text = `${form.get('comentario')} - ${form.get('hello-message')}`;
        buttonMailto.setAttribute('href',`mailto:${form.get('email')}?subject=${subject}&body=${text}`);
        buttonMailto.click();
    }
}

// Cancelar
const btnPaginaAnterior = document.getElementById("btn-cancelar");
btnPaginaAnterior.addEventListener('click', () => {
    window.history.back();
});