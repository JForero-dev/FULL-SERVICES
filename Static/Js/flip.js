document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".rig-card");

    cards.forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.closest("a")) return;

        cards.forEach(c => {
            if (c !== card) c.classList.remove("flipped");
        });

        card.classList.toggle("flipped");
        });
    });
});