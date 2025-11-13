const cvInput = document.getElementById("cv");
const fileName = document.getElementById("fileName");
const cvLabel = document.getElementById("cvLabel");

cvInput.addEventListener("change", () => {
    const file = cvInput.files[0];
    fileName.textContent = file ? file.name : "No files selected";
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
    document.getElementById("nameError").textContent = "Please enter your full name.";
    valid = false;
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    valid = false;
    }

    if (phone && !/^[0-9\-\+\s]{6,15}$/.test(phone)) {
    document.getElementById("phoneError").textContent = "Please enter a valid phone number.";
    valid = false;
    }

    if (!message) {
    document.getElementById("messageError").textContent = "Please write a message.";
    valid = false;
    }

    if (!policy) {
    document.getElementById("policyError").textContent = "You must accept the privacy policy.";
    valid = false;
    }

    if (!valid) return;
    const templateParams = {
        name,
        email,
        phone: phone || "Not specified",
        message,
        time: new Date().toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })
    };

    emailjs.send("service_fktzf58","template_80fd6jk", templateParams)
    .then(() => {
        successMsg.textContent = "Your application has been successfully sent! We’ll contact you soon.";
        successMsg.style.display = "block";
        form.reset();
        document.getElementById("fileName").textContent = "No file selected";
    })
    .catch(() => {
        successMsg.textContent = "There was an error sending the form. Please try again.";
        successMsg.style.display = "block";
    });
});
