import { getRemainingCount, applyFilter} from './utils.js';
import {
    loadTodos,
    loadFilter,
    saveTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    saveFilter,
} from './state.js';

// DOM Elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filters = document.querySelectorAll('.filter');
const clearCompletedBtn = document.getElementById('clear-completed');

const MAX_TODO_LENGTH = 100;

// State
let todos = loadTodos();
let currentFilter = loadFilter();

// Create Todo Element
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.textContent = todo.text;

    if (todo.completed) {
        li.style.textDecoration = 'line-through';
    }

    li.addEventListener('click', function () {
        toggleTodo(todo.id);
    });

    li.addEventListener('dblclick', function () {
        const newText = prompt('Edit task:', todo.text);
        if (newText && newText.trim() !== '') {
            todo.text = newText.trim();
            renderTodos();
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        deleteTodo(todo.id);
    });

    li.appendChild(deleteBtn);
    return li;
}

// Display tasks
function renderTodos() {
    todos = loadTodos();

    todoList.innerHTML = '';

    const filteredTodos = applyFilter(todos, currentFilter);

    filteredTodos.forEach(function (todo) {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });

    updateStats();
}
function updateStats() {
    const remaining = getRemainingCount(todos);
    itemsLeft.textContent = `${remaining} items left`;
}

// Filter buttons
function filterTodos(filter) {
    currentFilter = filter;
    saveFilter(filter);
    renderTodos();
}

// Clear completed
clearCompletedBtn.addEventListener('click', function () {
    todos = todos.filter(function (todo) {
        return !todo.completed;
    });

    saveTodos(todos);
    renderTodos();
});

// Form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === '') {
        return;
    }
    addTodo(text);
    input.value = '';
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === '') {
        return;
    }
    if (text.length > MAX_TODO_LENGTH) {
        alert(`Todo must be under ${MAX_TODO_LENGTH} characters`);
        return;
    }
    addTodo(text);
    input.value = '';
});

// Filter events
filters.forEach(function (button) {
    button.addEventListener('click', function () {
        filters.forEach(function (btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        filterTodos(button.dataset.filter);
    });
});

export { renderTodos };
