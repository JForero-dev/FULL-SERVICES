document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("card");
    if (!card) return;

    function toggleFlip() {
        card.classList.toggle("flipped");
    }

    let startX = 0, startY = 0;

    card.addEventListener("pointerdown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
    });

    card.addEventListener("pointerup", (e) => {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);

        if (dx < 20 && dy < 20) {
            if (!e.target.closest(".contact-item")) {
                toggleFlip();
            }
        }
    });

    const emailButtons = document.querySelectorAll(".contact-item.email");
    const toast = document.getElementById("copiedToast");

    emailButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const email = btn.dataset.email;

            navigator.clipboard.writeText(email);

            toast.innerHTML = `<i class="fa-solid fa-check"></i> Correo copiado`;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 2500);
        });
    });
});


const emailButtons = document.querySelectorAll(".contact-item.email");
const toast = document.getElementById("copiedToast");

emailButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const email = btn.dataset.email;
        navigator.clipboard.writeText(email);
        toast.innerHTML = `<i class="fa-solid fa-check"></i> Correo copiado`;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none"; 
    document.body.style.msUserSelect = "none";      
    document.addEventListener("contextmenu", (e) => e.preventDefault());
});