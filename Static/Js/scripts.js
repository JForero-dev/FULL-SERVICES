const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNav);

let scrollTimeout;
const optimizedScroll = () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        revealOnScroll();
        animateStats();
        highlightNav();
    });
};

window.addEventListener('scroll', optimizedScroll);

document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    
    const firstNavLink = document.querySelector('.nav-link[href="#inicio"]');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
    
    console.log('Full Services - Landing Page cargada correctamente');
});

(function () {
    document.addEventListener('keydown', function (e) {
    const blockedCombos = [
        e.key === 'F12',
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J', 'K'].includes(e.key.toUpperCase())),
        (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase()))
    ];
    if (blockedCombos.some(Boolean)) {
        e.preventDefault();
        return false;
    }
    });

    document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('.partners-track')) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    e.preventDefault();
    });

    function protectImages() {
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', e => e.preventDefault());
        img.addEventListener('contextmenu', e => e.preventDefault());
    });
    }

    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', protectImages);
    } else {
    protectImages();
    }

    let devtoolsOpen = false;
    setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
        devtoolsOpen = true;
        console.warn('DevTools detectado — esta página intenta bloquear la inspección.');
        }
    } else {
        devtoolsOpen = false;
    }
    }, 1000);
})();