// Handle menu toggle
document.getElementById('menu-button').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('hidden');
});

// Handle About submenu
document.getElementById('about-button').addEventListener('click', () => {
  document.getElementById('about-menu').classList.toggle('hidden');
});

// Handle Contact submenu
document.getElementById('contact-button').addEventListener('click', () => {
  document.getElementById('contact-menu').classList.toggle('hidden');
});
