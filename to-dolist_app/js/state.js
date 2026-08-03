import { saveToStorage, getFromStorage } from './storage.js';
import { renderTodos } from './ui.js';

const STORAGE_KEY = 'todos';

function loadTodos() {
    return getFromStorage(STORAGE_KEY, []);
}

function saveTodos(todos) {
    saveToStorage(STORAGE_KEY, todos);
}

const FILTER_KEY = 'filter';

function loadFilter() {
    return getFromStorage(FILTER_KEY, 'all');
}

function saveFilter(filter) {
    saveToStorage(FILTER_KEY, filter);
}

function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    const todos = loadTodos();
    todos.push(newTodo);
    saveTodos(todos);

    renderTodos();
}

function toggleTodo(id) {
    const todos = loadTodos();
    const todo = todos.find((t) => t.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    let todos = loadTodos();
    todos = todos.filter((t) => t.id !== id);
    saveTodos(todos);
    renderTodos();
}

export {
    loadTodos,
    saveTodos,
    loadFilter,
    saveFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
};
