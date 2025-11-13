const postsData = [
    {
    id: 1,
    title: "¡Celebramos 30 años de éxito!",
    author: "Full Services",
    content:
        "Full Services cumple tres décadas de crecimiento, compromiso y excelencia. Gracias a nuestros colaboradores y clientes por ser parte de esta historia. ¡Vamos por muchos años más de logros y servicio!",
    category: "logros",
    date: "1995-05-25",
    image: "Static/Images/FULL-BLOG.webp",
    },
    {
    id: 2,
    title: "Técnicas de estiramiento",
    author: "Full Services",
    content:
        "Para nosotros es importante la salud de nuestros trabajadores, y de seguro estas técnicas serán de ayuda para tu empresa y equipo.",
    category: "noticias",
    date: "2023-06-30",
    image: ["Static/Images/noticia1.webp",
        "Static/Images/noticia2.webp",
        "Static/Images/noticia3.webp",
        "Static/Images/noticia4.webp",
        "Static/Images/noticia5.webp",
        "Static/Images/noticia6.webp",
        "Static/Images/noticia7.webp",
        "Static/Images/noticia8.webp",
        "Static/Images/noticia9.webp",
        "Static/Images/noticia10.webp"]
    },
    {
    id: 3,
    title: "Realizamos un simulacro de emergencia",
    author: "HSEQ",
    content:
        "El simulacro de emergencia se desarrolló con éxito, demostrando una buena coordinación y compromiso por parte de todos los colaboradores. La evacuación fue ordenada y permitió comprobar la efectividad de nuestros protocolos de seguridad.",
    category: "eventos",
    date: "2025-10-24",
    image: "Static/Images/hse.webp",
    },
];

let currentFilter = "all";
let displayedPosts = 6;

document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
    initializeFilters();
    initializeLoadMore();
    setTimeout(() => initializePostCarousels(), 300);
});

function renderPosts() {
    const postsContainer = document.getElementById("blog-posts-container");
    if (!postsContainer) return;

    const filteredPosts =
    currentFilter === "all"
        ? postsData
        : postsData.filter((post) => post.category === currentFilter);

    const postsToShow = filteredPosts.slice(0, displayedPosts);

    postsContainer.innerHTML = postsToShow.map((post) => createPostCard(post)).join("");
    initializePostCarousels();
    updateLoadMoreButton(filteredPosts.length);
}

function createPostCard(post) {
    const images = Array.isArray(post.image)
    ? post.image
    : [post.image];

        return `
        <article class="blog-post-card" data-category="${post.category}">
        <div class="blog-post-header">
        <div class="blog-post-avatar">
            <img src="Static/Images/full.webp" alt="logo" />
        </div>
        <div class="blog-post-info">
            <h3>${post.author}</h3>
            <div class="blog-post-meta">
            <span class="blog-post-category">${getCategoryName(post.category)}</span>
            <span>•</span>
            <span>${formatDate(post.date)}</span>
            </div>
        </div>
        </div>

        <div class="blog-post-carousel" data-id="${post.id}">
        <button class="blog-carousel-btn prev" aria-label="Anterior">&#10094;</button>

        <div class="blog-carousel-track">
            ${images
            .map(
                (img) => `
                <img src="${img}" class="blog-carousel-image" alt="${escapeHtml(post.title)}" />
            `
            )
            .join("")}
        </div>

        <button class="blog-carousel-btn next" aria-label="Siguiente">&#10095;</button>
        </div>

        <div class="blog-post-content">
        <h4>${escapeHtml(post.title)}</h4>
        <p>${escapeHtml(post.content)}</p>
        </div>
    </article>
    `;
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll(".blog-filter-btn");

    filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");

        currentFilter = button.dataset.filter || "all";
        displayedPosts = 6;
        renderPosts();
    });
    });
}

function initializeLoadMore() {
    const loadMoreBtn = document.getElementById("load-more");
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", () => {
    displayedPosts += 3;
    renderPosts();
    });
}

function updateLoadMoreButton(totalPosts) {
    const loadMoreBtn = document.getElementById("load-more");
    if (!loadMoreBtn) return;

    if (displayedPosts >= totalPosts) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "No hay más publicaciones";
    } else {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Cargar más publicaciones";
    }
}

function initializePostCarousels() {
    document.querySelectorAll(".blog-post-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".blog-carousel-track");
    const slides = carousel.querySelectorAll(".blog-carousel-image");
    const prevBtn = carousel.querySelector(".blog-carousel-btn.prev");
    const nextBtn = carousel.querySelector(".blog-carousel-btn.next");
    let index = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener("click", () => {
        index = (index > 0) ? index - 1 : slides.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        index = (index < slides.length - 1) ? index + 1 : 0;
        updateCarousel();
    });
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });
}

function getCategoryName(category) {
    const categories = { noticias: "Noticias", eventos: "Eventos", logros: "Logros" };
    return categories[category] || category;
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function animateStats() {

}