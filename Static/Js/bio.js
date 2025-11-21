const EMAIL = "sjfs@fullservices.com.co"; 

// Toast
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// Copiar correo
document.getElementById("copyEmail").addEventListener("click", () => {
    navigator.clipboard.writeText(EMAIL)
        .then(() => showToast("Correo copiado"))
        .catch(() => showToast("Error al copiar"));
});

// Copiar URL del sitio
document.getElementById("copyURL").addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href)
        .then(() => showToast("URL copiada"))
        .catch(() => showToast("Error al copiar"));
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    for (let el of reveals) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
