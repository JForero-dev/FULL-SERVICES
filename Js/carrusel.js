document.addEventListener('DOMContentLoaded', () => {
    const backgrounds = document.querySelectorAll('.hero-background');
    let currentIndex = 0;

    function showNextBackground() {
        backgrounds[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % backgrounds.length;
        backgrounds[currentIndex].classList.add('active');
    }

    setInterval(showNextBackground, 5000);
});