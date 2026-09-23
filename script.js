const toggleBtn = document.getElementById('toggleBtn');

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');

  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  console.log('Theme switched to:', isDark ? 'dark' : 'light');
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️ Light Mode';
  }
  console.log('Theme loaded:', saved || 'light');
});
