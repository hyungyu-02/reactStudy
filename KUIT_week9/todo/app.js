var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const todoListEl = document.getElementById("todoList");
const todoInputEl = document.getElementById("todoInput");
const API_URL = "http://localhost:8080/todos";
const fetchTodos = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch(API_URL);
        if (!response.ok)
            throw new Error("Failed to fetch Todos");
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching Todos:", error);
    }
});
const updateTodo = (todo) => __awaiter(this, void 0, void 0, function* () {
    const todoItem = document.querySelector(`#todo-${todo.id}`);
    if (!todoItem)
        return;
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = todo.title;
    const updateButton = document.createElement("button");
    updateButton.textContent = "Save";
    updateButton.onclick = () => __awaiter(this, void 0, void 0, function* () {
        const updatedTitle = inputEl.value.trim();
        if (!updatedTitle) {
            alert("Title cannot be empty");
            return;
        }
        console.log("Updating todo:", { id: todo.id, title: updatedTitle });
        try {
            const response = yield fetch(`${API_URL}/${todo.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.assign(Object.assign({}, todo), { title: updatedTitle })),
            });
            console.log("Response status:", response.status);
            if (!response.ok)
                throw new Error("Failed to update todo.");
            const todos = yield fetchTodos();
            if (todos)
                renderTodo(todos);
        }
        catch (error) {
            console.error("Error updating todo:", error);
            alert("Failed to update the todo.");
        }
    });
    todoItem.innerHTML = "";
    todoItem.append(inputEl, updateButton);
});
const renderTodo = (newTodos) => {
    if (!todoListEl)
        return;
    todoListEl.innerHTML = "";
    newTodos.forEach((todo) => {
        const listEl = document.createElement("li");
        listEl.textContent = todo.title;
        listEl.id = `todo-${todo.id}`;
        const deleteEl = document.createElement("span");
        deleteEl.textContent = "🗑️";
        deleteEl.onclick = () => deleteTodo(todo.id);
        const udpateEl = document.createElement("span");
        udpateEl.textContent = "✏️";
        udpateEl.onclick = () => updateTodo(todo);
        listEl.append(deleteEl);
        listEl.append(udpateEl);
        todoListEl.append(listEl);
    });
};
const addTodo = () => __awaiter(this, void 0, void 0, function* () {
    if (!todoInputEl)
        return;
    const title = todoInputEl.value.trim();
    if (!title)
        return;
    const date = new Date();
    const createdAt = date.toDateString();
    const newTodo = {
        id: date.getTime().toString(),
        title: title,
        createdAt: createdAt,
    };
    try {
        yield fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.assign(Object.assign({}, newTodo), { completed: false })),
        });
        if (todoInputEl)
            todoInputEl.value = "";
        const todos = yield fetchTodos();
        if (todos)
            renderTodo(todos);
    }
    catch (error) {
        console.error("Error adding todo:", error);
    }
});
const deleteTodo = (todoId) => __awaiter(this, void 0, void 0, function* () {
    console.log(`Attempting to delete todo with id: ${todoId}`);
    try {
        const response = yield fetch(`${API_URL}/${todoId}`, {
            method: "DELETE",
        });
        if (!response.ok)
            throw new Error("Failed to delete todo.");
        const todos = yield fetchTodos();
        if (todos)
            renderTodo(todos);
    }
    catch (error) {
        console.error("Error deleting todo:", error);
    }
});
(() => __awaiter(this, void 0, void 0, function* () {
    const todos = yield fetchTodos();
    if (todos)
        renderTodo(todos);
}))();
