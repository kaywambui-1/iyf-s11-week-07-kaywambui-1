// Simple render function so setState() has something to call
function render() {
    console.log("Rendering with state:", state);
}

// Simple state management pattern
const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

// State update function
function setState(updates) {
    Object.assign(state, updates);
    saveState();
    render();
}

// Update specific properties
function setFilter(filter) {
    setState({ filter });
}

function addTodo(text) {
    setState({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
    });
}

function toggleTodo(id) {
    setState({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    });
}

// Persist state
function saveState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem("appState");
    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
}

// --- Testing Exercise 1 ---
loadState();          // check if there's saved state from before
addTodo("Buy milk");  // should log the state with 1 todo
setFilter("active");  // should log the state with filter changed


// Simple renderUI function so the subscriber has something to call
function renderUI(state) {
    console.log("UI would update with:", state);
}


// State with subscribers
const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];
    
    return {
        getState: () => state,
        
        setState: (updates) => {
            state = { ...state, ...updates };
            // Notify all listeners
            listeners.forEach(listener => listener(state));
        },
        
        subscribe: (listener) => {
            listeners.push(listener);
            // Return unsubscribe function
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        }
    };
};

// Usage
const store = createStore({ count: 0 });

// Subscribe to changes
const unsubscribe = store.subscribe(state => {
    console.log("State changed:", state);
    renderUI(state);
});

// Update state
store.setState({ count: 1 });  // Triggers subscriber
store.setState({ count: 2 });  // Triggers subscriber

// Stop listening
unsubscribe();