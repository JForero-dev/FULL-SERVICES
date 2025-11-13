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
            En <strong>Full Services</strong> somos líderes en operaciones de <strong>Workover</strong>, brindando soluciones integrales para optimizar la producción de pozos petroleros. 
            Contamos con <strong>equipos modernos, personal altamente calificado</strong> y un compromiso absoluto con la seguridad y la eficiencia operativa.
            </p>
            <p>
            Nuestro enfoque está en <strong>maximizar la productividad</strong> de cada pozo, reduciendo los tiempos de inactividad y aplicando procedimientos certificados que garantizan resultados confiables. 
            Disponemos de unidades con potencias desde <strong>350 HP hasta 650 HP</strong>, equipadas con subestructuras rotarias, bombas triplex de alto rendimiento y herramientas especializadas para todo tipo de operación.
            </p>
            <p>
            Elegir Full Services es contar con un aliado estratégico en campo. 
            Nuestro trabajo combina experiencia, tecnología y compromiso, asegurando que cada proyecto sea un éxito desde el primer día.
            </p>
        `,
        videos: ["https://youtu.be/BWEsYqKLD7U?si=mo7dO_El7e86HSpI"]
    },
    3: {
        title: "Mantenimiento",
        icon: "fa-solid fa-screwdriver-wrench",
        content: `
            <p>
            En <strong>Full Services</strong> entendemos que el tiempo es el recurso más valioso de cualquier operación. 
            Por eso ofrecemos servicios de <strong>mantenimiento preventivo y correctivo</strong> que prolongan la vida útil de tus equipos y evitan paradas innecesarias.
            </p>
            <p>
            Nuestro personal técnico cuenta con amplia experiencia en diagnóstico, reparación y optimización de maquinaria pesada, utilizando repuestos certificados y procesos de alta calidad. 
            Intervenimos con precisión, minimizando el impacto en tus operaciones y garantizando <strong>máximo rendimiento y seguridad</strong>.
            </p>
            <p>
            Deja tu maquinaria en manos de profesionales. 
            Con Full Services, tu operación nunca se detiene.
            </p>
        `,
        images: [ "Static/Images/Mantenimiento 1.jpeg", "Static/Images/Mantenimiento 3.jpeg", "Static/Images/Mantenimiento 4.jpeg"]
    },
    6: {
        title: "Alquiler",
        icon: "fa-solid fa-truck-monster",
        content: `
            <p>
            En <strong>Full Services</strong> te ofrecemos <strong>alquiler de maquinaria pesada</strong> confiable, moderna y lista para trabajar, con opciones flexibles que se adaptan a tus necesidades operativas y presupuestales. 
            Nos especializamos en equipos de alto rendimiento para <strong>movimiento de tierra, construcción y operaciones industriales</strong>.
            </p>
            <p>
            Cada máquina pasa por un riguroso proceso de mantenimiento preventivo para garantizar su óptimo funcionamiento en todo momento. 
            Además, nuestro equipo técnico está disponible para brindar soporte, transporte y capacitación, asegurando un servicio <strong>rápido, seguro y sin contratiempos</strong>.
            </p>
            <p>
            Con Full Services, no solo alquilas equipos: <strong>obtienes productividad, respaldo y confianza</strong> en cada proyecto.
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

