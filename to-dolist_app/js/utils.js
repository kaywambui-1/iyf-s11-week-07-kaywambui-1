export function getRemainingCount(todos) {
    return todos.filter(function (todo) {
        return !todo.completed;
    }).length;
}

export function applyFilter(todos, filter) {
    if (filter === "active") {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    }
    if (filter === "completed") {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }
    return todos;
}