const backToTopBtn = document.getElementById('backToTop');
const waButton = document.getElementById('waButton');
const waModal = document.getElementById('waModal');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
    waButton.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
    waButton.classList.remove('show');
    waModal.classList.remove('show'); 
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

waButton.addEventListener('click', (e) => {
  e.stopPropagation(); 
  waModal.classList.toggle('show'); 
});

document.addEventListener('click', (e) => {
  if (!waModal.contains(e.target) && !waButton.contains(e.target)) {
    waModal.classList.remove('show');
  }
});
