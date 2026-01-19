const vacancies = [
    {
        id: 1,
        title: "Administrative Assistant",
        requirements: [
            "Technician or technologist in administration or related fields.",
            "Basic proficiency in Excel and Word.",
            "Good writing and spelling skills.",
            "Organization and attention to detail.",
            "Immediate availability."
        ]
    },
    {
        id: 2,
        title: "HSEQ Engineer",
        requirements: [
            "Professional in Occupational Health and Safety.",
            "Minimum of 2 years of experience.",
            "Knowledge of ISO standards.",
            "Leadership skills.",
            "Availability to travel."
        ]
    },
    {
        id: 3,
        title: "Maintenance Technician",
        requirements: [
            "Technician in industrial maintenance.",
            "Experience with heavy machinery.",
            "Teamwork skills.",
            "Responsibility and commitment.",
            "Valid driver's license."
        ]
    },
    {
        id: 1,
        title: "Administrative Assistant",
        requirements: [
            "Technician or technologist in administration or related fields.",
            "Basic proficiency in Excel and Word.",
            "Good writing and spelling skills.",
            "Organization and attention to detail.",
            "Immediate availability."
        ]
    },
    {
        id: 2,
        title: "HSEQ Engineer",
        requirements: [
            "Professional in Occupational Health and Safety.",
            "Minimum of 2 years of experience.",
            "Knowledge of ISO standards.",
            "Leadership skills.",
            "Availability to travel."
        ]
    },
    {
        id: 3,
        title: "Maintenance Technician",
        requirements: [
            "Technician in industrial maintenance.",
            "Experience with heavy machinery.",
            "Teamwork skills.",
            "Responsibility and commitment.",
            "Valid driver's license."
        ]
    }
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
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

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
    modalTitle.textContent = `Apply to: ${vacancy}`;
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
    fileName.textContent = file ? file.name : "No files selected";
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
        document.getElementById("nameError").textContent = "Enter your full name.";
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
        document.getElementById("messageError").textContent = "Write a message.";
        valid = false;
    }

    if (!policy) {
        document.getElementById("policyError").textContent = "You must accept the policy.";
        valid = false;
    }

    if (!valid) return;

    const templateParams = {
        name,
        email,
        phone: phone || "Not specified",
        message,
        vacancy,
        time: new Date().toLocaleString("es-CO", {
            dateStyle: "short",
            timeStyle: "short"
        })
    };

    emailjs.send("service_fktzf58", "template_80fd6jk", templateParams)
        .then(() => {
            successMsg.textContent = "Your request was sent successfully.";
            successMsg.style.display = "block";
            form.reset();
            fileName.textContent = "No files selected";
            modal.classList.remove("show");
        })
        .catch(() => {
            successMsg.textContent = "An error occurred while submitting the form.";
            successMsg.style.display = "block";
        });
});
