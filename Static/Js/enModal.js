const BASE_URL = window.location.origin.includes("github.io")
    ? "https://jacobo-forero.github.io/FULL-SERVICES/"
    : "";

const modal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.modal-close');

const serviceData = {
    1: {
        title: "Workover",
        icon: "fa-solid fa-oil-well",
        content: `
            <p>
            At <strong>Full Services</strong>, we are leaders in <strong>workover</strong> operations, providing comprehensive solutions to optimize oil well production. 
            We have <strong>modern equipment, highly qualified personnel</strong>, and an absolute commitment to safety and operational efficiency.
            </p>
            <p>
            Our focus is on maximizing the productivity of each well, reducing downtime, and applying certified procedures that guarantee reliable results. 
            We have units with power ratings from 350 HP to 650 HP, equipped with rotary substructures, high-performance triplex pumps, and specialized tools for all types of operations.
            </p>
            <p>
            Choosing Full Services means having a strategic ally in the field. 
            Our work combines experience, technology, and commitment, ensuring that every project is a success from day one.
            </p>
        `,
        videos: ["https://youtu.be/BWEsYqKLD7U?si=mo7dO_El7e86HSpI"]
    },
    3: {
        title: "Maintenance",
        icon: "fa-solid fa-screwdriver-wrench",
        content: `
            <p>
            At <strong>Full Services</strong>, we understand that time is the most valuable resource in any operation. 
            That's why we offer <strong>preventive and corrective maintenance</strong> services that extend the useful life of your equipment and prevent unnecessary downtime.
            </p>
            <p>
            Our technical staff has extensive experience in diagnosing, repairing, and optimizing heavy machinery, using certified spare parts and high-quality processes. 
            We intervene with precision, minimizing the impact on your operations and ensuring <strong>maximum performance and safety</strong>.
            </p>
            <p>
            Leave your machinery in the hands of professionals. 
            With Full Services, your operation never stops.
            </p>
        `,
        images: [ "Static/Images/Mantenimiento 1.jpeg", "Static/Images/Mantenimiento 3.jpeg", "Static/Images/Mantenimiento 4.jpeg"]
    },
    6: {
        title: "Rental",
        icon: "fa-solid fa-truck-monster",
        content: `
            <p>
            At <strong>Full Services</strong>, we offer reliable, modern, and ready-to-work <strong>heavy equipment rental</strong>, with flexible options that adapt to your operational and budgetary needs. We specialize in high-performance equipment for <strong>earthmoving, construction, and industrial operations</strong>.
            </p>
            <p>
            Each machine undergoes a rigorous preventive maintenance process to ensure optimal performance at all times. 
            In addition, our technical team is available to provide support, transportation, and training, ensuring <strong>fast, safe, and smooth service</strong>.
            </p>
            <p>
            With Full Services, you don't just rent equipment: you <strong>get productivity, support, and confidence</strong> in every project.
            </p>
        `,
        images: [
            { src: "Static/Images/Trailers/1.png", link: "Templates/Servicios/Trailers1.html" },
            { src: "Static/Images/Trailers/2.png", link: "Templates/Servicios/Trailers2.html" },
            { src: "Static/Images/Trailers/3.png", link: "Templates/Servicios/Trailers3.html" },
            { src: "Static/Images/Trailers/4.png", link: "Templates/Servicios/Trailers4.html" },
            { src: "Static/Images/Trailers/5.png", link: "Templates/Servicios/Trailers5.html" },
            { src: "Static/Images/Trailers/6.png", link: "Templates/Servicios/Trailers6.html" },
            { src: "Static/Images/Trailers/7.png", link: "Templates/Servicios/Trailers7.html" },
            { src: "Static/Images/Trailers/8.png", link: "Templates/Servicios/Trailers8.html" },
            { src: "Static/Images/Trailers/9.png", link: "Templates/Servicios/Trailers9.html" },
        ]
    }
};

// Construcción segura de URLs (para GitHub Pages o local)
function joinURL(base, path) {
    if (!base.endsWith('/')) base += '/';
    if (path.startsWith('/')) path = path.substring(1);
    return base + path;
}

// Mostrar modal con contenido dinámico
document.querySelectorAll('.btn-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-service');
        const data = serviceData[id];
        if (!data) return;

        let mediaHTML = "";

        // Collage especial con enlaces (solo Alquiler)
        if (id === "6" && data.images) {
            mediaHTML = `
                <div class="special-collage">
                    ${data.images.map(img => `
                        <a href="${joinURL(BASE_URL, img.link)}" class="collage-item" target="_blank" rel="noopener noreferrer">
                            <img src="${joinURL(BASE_URL, img.src)}" alt="${data.title}">
                            <div class="collage-overlay"><span>Ver más</span></div>
                        </a>
                    `).join('')}
                </div>
            `;
        }

        // Collage normal de imágenes
        else if (data.images && data.images.length > 0) {
            mediaHTML = `
                <div class="modal-gallery collage">
                    ${data.images.map(img => `
                        <img src="${joinURL(BASE_URL, img)}" alt="${data.title}" class="modal-image">
                    `).join('')}
                </div>
            `;
        }

        // Video embebido
        else if (data.videos && data.videos.length > 0) {
            const videoURL = data.videos[0].replace("youtu.be/", "www.youtube.com/embed/");
            mediaHTML = `
                <div class="modal-gallery video">
                    <iframe class="modal-video" 
                        src="${videoURL}" 
                        title="${data.title}" 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        }

        // Contenido completo del modal
        modalBody.innerHTML = `
            <div class="modal-icon">
                <i class="${data.icon}"></i>
            </div>
            <h2>${data.title}</h2>
            <div class="modal-text">
                ${data.content}
            </div>
            ${mediaHTML}
        `;

        modal.style.display = 'flex';
    });
});

// Cerrar modal
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

