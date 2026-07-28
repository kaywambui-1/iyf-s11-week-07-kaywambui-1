function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

const themeBtn = document.getElementById('themeBtn');

// 1. Toggle the theme when the button is clicked
themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // Check which mode we're in NOW, and save that choice
    const isDark = document.body.classList.contains('dark-mode');
    saveToStorage('theme', isDark ? 'dark' : 'light');
});

// 2. On page load, check localStorage and apply the saved theme
const savedTheme = getFromStorage('theme', 'light'); // default to light if nothing saved yet

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}