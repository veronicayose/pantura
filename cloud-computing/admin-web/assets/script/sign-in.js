document.getElementById("signin").addEventListener("submit", function(event){
    event.preventDefault();
    const signInForm = event.target;
    const signInFormField = signInForm.elements;

    const email = signInFormField.email.value;
    const password = signInFormField.password.value;
    const role = signInFormField.role.value;
    
    let url = 'http://localhost:5000/login/'.concat(email, "/", password, "/", role);

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.responseCode === "success"){
            window.location.href = `./index.html`;
        }
    });
});