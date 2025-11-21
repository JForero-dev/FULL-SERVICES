emailjs.init('k9CobN2piVqOYZ3bU'); 

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPhone = (phone) => /^[0-9]{7,10}$/.test(phone.replace(/\s/g, ''));

const clearErrors = () => {
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';
    formSuccess.classList.remove('show');
};

const validateField = (input, errorElement, validationFn, errorMsg) => {
    if (!validationFn(input.value.trim())) {
        errorElement.textContent = errorMsg;
        input.style.borderColor = 'var(--color-primary)';
        return false;
    } else {
        errorElement.textContent = '';
        input.style.borderColor = 'var(--color-border)';
        return true;
    }
};

nameInput.addEventListener('blur', () => {
    validateField(nameInput, nameError, (v) => v.length >= 3, 'Name must be at least 3 characters long');
});
emailInput.addEventListener('blur', () => {
    validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address');
});
phoneInput.addEventListener('blur', () => {
    if (phoneInput.value.trim() !== '') {
        validateField(phoneInput, phoneError, isValidPhone, 'Please enter a valid phone number (7–10 digits)');
    }
});
messageInput.addEventListener('blur', () => {
    validateField(messageInput, messageError, (v) => v.length >= 10, 'Message must be at least 10 characters long');
});


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    if (!validateField(nameInput, nameError, (v) => v.length >= 3, 'Name must be at least 3 characters long')) isValid = false;
    if (!validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address')) isValid = false;
    if (phoneInput.value.trim() !== '' && !validateField(phoneInput, phoneError, isValidPhone, 'Please enter a valid phone number (7–10 digits)')) isValid = false;
    if (!validateField(messageInput, messageError, (v) => v.length >= 10, 'Message must be at least 10 characters long')) isValid = false;

    if (!isValid) {
        const firstError = contactForm.querySelector('.error-message:not(:empty)');
        if (firstError) firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    emailjs.send('service_fktzf58', 'template_gypiwnr', {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value,
        time: new Date().toLocaleString(),
    })
    .then(() => {
        formSuccess.textContent = "¡Mensaje enviado correctamente!";
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => formSuccess.classList.remove('show'), 4000);
    })
    .catch((error) => {
        console.error('Error sending via EmailJS:', error);
        alert("❌ There was an error sending your message. Please try again later.");
    });
});