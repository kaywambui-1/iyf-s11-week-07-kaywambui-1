// 1. Store a simple value
localStorage.setItem("username", "John");
// 2. Retrieve the value
const username = localStorage.getItem("username");
console.log(username);
// 3. Remove a value
localStorage.removeItem("username");
console.log(localStorage.getItem("username"));
// 4. Check if key exists
localStorage.setItem("username", "John"); // add it back so we have something to check
if (localStorage.getItem("username")) {
    console.log("User exists");
} else {
    console.log("No user found");
}
/* ============================
   EXERCISE 2: Storing Objects
   ============================ */

const user = {
    name: "John",
    age: 30,
    hobbies: ["coding", "reading"]
};

// ❌ WRONG - doesn't work as expected
localStorage.setItem("user", user);
console.log(localStorage.getItem("user"));

// ✅ RIGHT - serialize to JSON
localStorage.setItem("user", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log(retrieved);

/* ============================
   EXERCISE 3: Helper Functions
   ============================ */

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// Usage
saveToStorage("settings", { theme: "dark", fontSize: 16 });
const settings = getFromStorage("settings", { theme: "light", fontSize: 14 });
console.log(settings);