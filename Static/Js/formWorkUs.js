const cvInput = document.getElementById("cv");
const fileName = document.getElementById("fileName");
const cvLabel = document.getElementById("cvLabel");

cvInput.addEventListener("change", () => {
    const file = cvInput.files[0];
    fileName.textContent = file ? file.name : "Ningún archivo seleccionado";
});

(function() {
    emailjs.init("k9CobN2piVqOYZ3bU"); 
})();

const form = document.getElementById("jobForm");
const successMsg = document.getElementById("formSuccess");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();
    const policy = form.privacyPolicy.checked;

    let valid = true;

    if (!name) {
    document.getElementById("nameError").textContent = "Por favor, ingresa tu nombre completo.";
    valid = false;
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    document.getElementById("emailError").textContent = "Por favor, ingresa un correo electrónico válido.";
    valid = false;
    }

    if (phone && !/^[0-9\-\+\s]{6,15}$/.test(phone)) {
    document.getElementById("phoneError").textContent = "Por favor, ingresa un número de teléfono válido.";
    valid = false;
    }

    if (!message) {
    document.getElementById("messageError").textContent = "Por favor, escribe un mensaje.";
    valid = false;
    }

    if (!policy) {
    document.getElementById("policyError").textContent = "Debes aceptar la política de privacidad.";
    valid = false;
    }

    if (!valid) return;
    const templateParams = {
    name,
    email,
    phone: phone || "No especificado",
    message,
    time: new Date().toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })
    };

    emailjs.send("service_fktzf58","template_80fd6jk", templateParams)
    .then(() => {
        successMsg.textContent = "¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto contigo pronto.";
        successMsg.style.display = "block";
        form.reset();
        document.getElementById("fileName").textContent = "Ningún archivo seleccionado";
    })
    .catch(() => {
        successMsg.textContent = "Ocurrió un error al enviar el formulario. Inténtalo nuevamente.";
        successMsg.style.display = "block";
    });
});