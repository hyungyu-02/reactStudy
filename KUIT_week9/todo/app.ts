const todoListEl = document.getElementById("todoList") as HTMLUListElement | null;
const todoInputEl = document.getElementById("todoInput") as HTMLInputElement | null;

const API_URL = "http://localhost:8080/todos";

interface Todo {
  id: string;
  title: string;
  createdAt: string;
  completed: boolean;
}

const fetchTodos = async ():Promise<Todo[] | undefined> => {
  try{
    const response = await fetch(API_URL);
    if(!response.ok) throw new Error("Failed to fetch Todos");
    const data: Todo[] = await response.json();
    return data;
  }catch(error){
    console.error("Error fetching Todos:", error);
  }
};

const updateTodo = async (todo: Todo): Promise<void> => {
  const todoItem = document.querySelector(`#todo-${todo.id}`) as HTMLElement | null;
  if(!todoItem) return;
  
  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = todo.title;
  
  const updateButton = document.createElement("button");
  updateButton.textContent = "Save";
  
  updateButton.onclick = async () => {
    const updatedTitle = inputEl.value.trim();
    if(!updatedTitle){
      alert("Title cannot be empty");
      return;
    }

    console.log("Updating todo:", { id: todo.id, title: updatedTitle });

    try{
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, title: updatedTitle }),
      });
      console.log("Response status:", response.status);

      if(!response.ok) throw new Error("Failed to update todo.");
      const todos = await fetchTodos();
      if(todos) renderTodo(todos);
    }catch (error){
      console.error("Error updating todo:", error);
      alert("Failed to update the todo.");
    }
  };

  todoItem.innerHTML = "";
  todoItem.append(inputEl, updateButton);
};

const renderTodo = (newTodos: Todo[]): void => {
  if(!todoListEl) return;

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

const addTodo = async (): Promise<void> => {
  if(!todoInputEl) return;
  const title = (todoInputEl as HTMLInputElement).value.trim();
  if (!title) return;
  const date = new Date();
  const createdAt = date.toDateString();

  const newTodo: Omit<Todo, "completed"> = {
    id: date.getTime().toString(),
    title: title,
    createdAt: createdAt,
  };

  try{
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newTodo, completed: false }),
    });
  
    if(todoInputEl) todoInputEl.value = "";
    const todos = await fetchTodos();
    if(todos) renderTodo(todos);
  }catch(error){
    console.error("Error adding todo:", error);
  }
};

const deleteTodo = async (todoId: string): Promise<void> => {
  console.log(`Attempting to delete todo with id: ${todoId}`);
  try{
    const response = await fetch(`${API_URL}/${todoId}`, {
      method: "DELETE",
    });
    if(!response.ok) throw new Error("Failed to delete todo.");

    const todos = await fetchTodos();
    if(todos) renderTodo(todos);
  }catch(error){
    console.error("Error deleting todo:", error);
  }
};

(async () => {
  const todos = await fetchTodos();
  if(todos) renderTodo(todos);
})();