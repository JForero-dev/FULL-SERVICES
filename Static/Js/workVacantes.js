const vacancies = [
    {
        id: 1,
        title: "Auxiliar Administrativo",
        requirements: [
            "Técnico o tecnólogo en administración o áreas afines.",
            "Manejo básico de Excel y Word.",
            "Buena redacción y ortografía.",
            "Organización y atención al detalle.",
            "Disponibilidad inmediata."
        ]
    },
    {
        id: 2,
        title: "Ingeniero HSEQ",
        requirements: [
            "Profesional en Seguridad y Salud en el Trabajo.",
            "Experiencia mínima de 2 años.",
            "Conocimiento en normas ISO.",
            "Capacidad de liderazgo.",
            "Disponibilidad para viajar."
        ]
    },
    {
        id: 3,
        title: "Técnico en Mantenimiento",
        requirements: [
            "Técnico en mantenimiento industrial.",
            "Experiencia en maquinaria pesada.",
            "Trabajo en equipo.",
            "Responsabilidad y compromiso.",
            "Licencia de conducción vigente."
        ]
    },
    {
        id: 2,
        title: "Ingeniero HSEQ",
        requirements: [
            "Profesional en Seguridad y Salud en el Trabajo.",
            "Experiencia mínima de 2 años.",
            "Conocimiento en normas ISO.",
            "Capacidad de liderazgo.",
            "Disponibilidad para viajar."
        ]
    },
    {
        id: 3,
        title: "Técnico en Mantenimiento",
        requirements: [
            "Técnico en mantenimiento industrial.",
            "Experiencia en maquinaria pesada.",
            "Trabajo en equipo.",
            "Responsabilidad y compromiso.",
            "Licencia de conducción vigente."
        ]
    },
];

const perPage = 5;
let currentPage = 1;

const vacancyList = document.getElementById("vacancyList");
const vacancyTitle = document.getElementById("vacancyTitle");
const vacancyRequirements = document.getElementById("vacancyRequirements");
const applyBtn = document.getElementById("applyBtn");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

const modal = document.getElementById("workModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const vacancyInput = document.getElementById("vacancyInput");

const cvInput = document.getElementById("cv");
const fileName = document.getElementById("fileName");

function renderVacancies() {
    vacancyList.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const pageItems = vacancies.slice(start, start + perPage);

    pageItems.forEach(v => {
        const li = document.createElement("li");
        li.classList.add("vacancy-item");
        li.innerHTML = `<h4>${v.title}</h4>`;

        li.addEventListener("click", () => {
            document.querySelectorAll(".vacancy-item").forEach(el => el.classList.remove("active"));
            li.classList.add("active");

            vacancyTitle.textContent = v.title;
            vacancyRequirements.innerHTML = "";

            v.requirements.forEach(req => {
                const item = document.createElement("li");
                item.textContent = req;
                vacancyRequirements.appendChild(item);
            });

            applyBtn.disabled = false;
            applyBtn.dataset.vacancy = v.title;
        });

        vacancyList.appendChild(li);
    });

    const totalPages = Math.ceil(vacancies.length / perPage);
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderVacancies();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(vacancies.length / perPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderVacancies();
    }
});

renderVacancies();

applyBtn.addEventListener("click", () => {
    const vacancy = applyBtn.dataset.vacancy;
    modal.classList.add("show");
    modalTitle.textContent = `Aplicar a: ${vacancy}`;
    vacancyInput.value = vacancy;
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
});

cvInput.addEventListener("change", () => {
    const file = cvInput.files[0];
    fileName.textContent = file ? file.name : "Ningún archivo seleccionado";
});

(function () {
    emailjs.init("k9CobN2piVqOYZ3bU");
})();

const form = document.getElementById("jobForm");
const successMsg = document.getElementById("formSuccess");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();
    const policy = form.privacyPolicy.checked;
    const vacancy = form.vacancy.value;

    let valid = true;

    if (!name) {
        document.getElementById("nameError").textContent = "Ingrese su nombre completo.";
        valid = false;
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        document.getElementById("emailError").textContent = "Ingrese un correo válido.";
        valid = false;
    }

    if (phone && !/^[0-9\-\+\s]{6,15}$/.test(phone)) {
        document.getElementById("phoneError").textContent = "Ingrese un teléfono válido.";
        valid = false;
    }

    if (!message) {
        document.getElementById("messageError").textContent = "Escriba un mensaje.";
        valid = false;
    }

    if (!policy) {
        document.getElementById("policyError").textContent = "Debe aceptar la política.";
        valid = false;
    }

    if (!valid) return;

    const templateParams = {
        name,
        email,
        phone: phone || "No especificado",
        message,
        vacancy,
        time: new Date().toLocaleString("es-CO", {
            dateStyle: "short",
            timeStyle: "short"
        })
    };

    emailjs.send("service_fktzf58", "template_80fd6jk", templateParams)
        .then(() => {
            successMsg.textContent = "Tu solicitud fue enviada correctamente.";
            successMsg.style.display = "block";
            form.reset();
            fileName.textContent = "Ningún archivo seleccionado";
            modal.classList.remove("show");
        })
        .catch(() => {
            successMsg.textContent = "Ocurrió un error al enviar el formulario.";
            successMsg.style.display = "block";
        });
});
