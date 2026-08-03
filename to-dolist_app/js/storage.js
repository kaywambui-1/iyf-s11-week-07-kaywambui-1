function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

export { saveToStorage, getFromStorage };
