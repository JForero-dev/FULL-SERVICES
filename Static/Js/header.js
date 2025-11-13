const header = document.getElementById('header');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Ocultar al bajar, mostrar al subir
            if (currentScroll > lastScroll && currentScroll > 150) {
                header.classList.add('header-hide');
            } else {
                header.classList.remove('header-hide');
            }

            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});
