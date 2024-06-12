const { invoke } = window.__TAURI__.tauri;

let newTodoTitle;
let newTodoDescription;
let newTodoForm;
let todoView;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  console.log("test");
  greetMsgEl.textContent = await invoke("get_todos", { name: greetInputEl.value });
}

async function addTodo() {
  console.log("Add new TODO:" + newTodoTitle.value + " " + newTodoDescription.value);
  let newTodo = await invoke("add_todo", { title: newTodoTitle.value, description: newTodoDescription.value });
  console.log("Result:");
  console.log(newTodo);
  appendTodoView(newTodo.id, newTodo.title, newTodo.description, newTodo.completed);
  
  newTodoForm.reset();
}

async function updateTodo(event) {
  console.log("update");
  let todoDiv = event.target.parentNode.parentNode;
  console.log(todoDiv);
  let title = todoDiv.querySelector('.todoTitle');
  let description = todoDiv.querySelector('.todoDescription');
  let completed = event.target.checked;
  const id = todoDiv.className.replace('todo-','');
  console.log(title.textContent, description.textContent, completed, id);
  let updatedTodo = await invoke("update_todo", {id, title: title.textContent, description: description.textContent, completed: completed});
  console.log(updatedTodo);
  title.textContent = updatedTodo.title;
  description.textContent = updatedTodo.description;
  event.target.checked = updatedTodo.completed;
}

async function deleteTodo(event) {
  let todoDiv = event.target.parentNode.parentNode;
  console.log(todoDiv);
  const todoId = todoDiv.className.replace('todo-', '');
  console.log("ID to delete: " + todoId);
  let res = await invoke("delete_todo", { id: todoId });
  console.log(res);
  if (res) {
    removeFromTodoView(todoId);
  }
}

function appendTodoView(id, title, description, completed) {
  
  let todo = document.importNode(todoTemplate.content, true);
  todo.querySelector(".todoTitle").textContent = title;
  todo.querySelector(".todoDescription").textContent = description;
  todo.getElementById("checkTodo").checked = completed
  let todoContainer = todo.querySelector(".todo");
  todoContainer.className = todoContainer.className.replace("todo", "todo-" + id);
  let todoCheckbox = todo.getElementById("checkTodo")
  todoCheckbox.addEventListener("change", updateTodo);

  todoView.appendChild(todo.cloneNode(true));
  todoView.querySelector(".todo-" + id).querySelector(".deleteTodo").addEventListener("click", deleteTodo);
  todoView.querySelector(".todo-" + id).querySelector("#checkTodo").addEventListener("click", updateTodo);
  todoView.querySelector(".todo-" + id).querySelector(".todoDescription").addEventListener("input", delay(updateTodo, 500));
}

function removeFromTodoView(id) {
  const todoClassName = new RegExp('todo-' + id);
  let deleteView;
  for (const todo of todoView.children) {
    if (todoClassName.test(todo.className)) {
      deleteView = todo
    }
  }
  if (deleteView) {
    todoView.removeChild(deleteView);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  todoView = document.getElementById("todoView");
  initializeForm();
  await loadTodos();
})

async function loadTodos() {
  //document.getElementById("loading").textContent = 'Test1';

  todoTemplate = document.getElementById("todoTemplate");
  //document.getElementById("loading").textContent = 'Test2';
  
  console.log("Loading Todos...");

  let todos =  await invoke("get_todos", { name: "testname" });
  todoView = document.getElementById("todoView");
  todoTemplate = document.getElementsByTagName("template")[0];
    
  for (const t in todos) {
    appendTodoView(todos[t].id, todos[t].title, todos[t].description, todos[t].completed)
  };
  document.getElementById("loading").style.display = 'none';
}

function initializeForm() {
  newTodoTitle = document.getElementById("title-input");
  newTodoDescription = document.getElementById("description-input");
  newTodoForm = document.getElementById("todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  })
}

function delay(func, ms) {
  let delay = 0
  return function(...args) {
    clearTimeout(delay)
    delay = setTimeout(func.bind(this, ...args), ms)
  }
}
