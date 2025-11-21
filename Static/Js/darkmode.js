const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
} else {
    const hour = new Date().getHours();

    if (hour >= 18 || hour < 6) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
});