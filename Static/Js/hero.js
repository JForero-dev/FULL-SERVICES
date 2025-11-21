document.addEventListener("DOMContentLoaded", () => {
  const text = "FULL SERVICES";
  const typingEl = document.querySelector(".typing");
  typingEl.textContent = "";

  let i = 0;
  let isTyping = true;

  function typeEffect() {
    if (isTyping) {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 180); // velocidad de escritura suave
      } else {
        isTyping = false;
        setTimeout(typeEffect, 4000); // pausa antes de borrar
      }
    } else {
      if (i > 0) {
        typingEl.textContent = text.substring(0, i - 1);
        i--;
        setTimeout(typeEffect, 80); // borrado más rápido para fluidez
      } else {
        isTyping = true;
        setTimeout(typeEffect, 1000); // pausa antes de volver a escribir
      }
    }
  }

  typeEffect();
});
