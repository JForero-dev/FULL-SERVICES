const partnersTrack = document.querySelector('.partners-track');

partnersTrack.addEventListener('mouseenter', () => {
  partnersTrack.style.animationPlayState = 'paused';
});

partnersTrack.addEventListener('mouseleave', () => {
  partnersTrack.style.animationPlayState = 'running';
});