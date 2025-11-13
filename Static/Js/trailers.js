const miniaturas = document.querySelectorAll('.mini');
const imagenPrincipal = document.getElementById('imagen-principal');

miniaturas.forEach(mini => {
  mini.addEventListener('click', () => {
    miniaturas.forEach(m => m.classList.remove('activa'));
    mini.classList.add('activa');
    imagenPrincipal.src = mini.src;
  });
});