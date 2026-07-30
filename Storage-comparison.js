const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");

// Save on every input
inputs.forEach(input => {
    // Load saved value on page load
    const saved = sessionStorage.getItem(`form_${input.name}`);
    if (saved) {
        input.value = saved;
    }
    
    // Save on input
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
    });
});

// Clear on successful submit
form.addEventListener("submit", () => {
    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
    });
});