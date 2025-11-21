const slides = document.querySelectorAll('.about-slide');
const prev = document.getElementById('prevSlide');
const next = document.getElementById('nextSlide');
const dotsContainer = document.querySelector('.dots-container'); // Nuevo
const dots = document.querySelectorAll('.dot'); // Nuevo
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    // Actualizar puntos
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Navegación con flechas
prev.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

next.addEventListener('click', () => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});

// Navegación con puntos (dots)
dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        currentSlide = parseInt(e.target.dataset.slideIndex);
        showSlide(currentSlide);
    }
});

showSlide(currentSlide);