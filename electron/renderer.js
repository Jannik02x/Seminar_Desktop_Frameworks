let todoView = document.getElementById("todoView");
let newTodoTitle;
let newTodoDescription;
let newTodoForm;

window.api.todosLoaded((todos) => {
    console.log("todos loaded:");
    console.log(todos);
    loadTodos(todos)
})

async function addTodo() {
    window.api.addTodo(newTodoTitle.value, newTodoDescription.value)
}

window.api.todoAdded((newTodo) => {
    console.log("Result:");
    console.log(newTodo);
    appendTodoView(newTodo.id, newTodo.title, newTodo.description, newTodo.completed);
    
    newTodoForm.reset();
})

async function updateTodo(event) {
  let todoDiv = event.target.parentNode.parentNode;
  let title = todoDiv.querySelector('.todoTitle');
  let description = todoDiv.querySelector('.todoDescription');
  let completed = event.target.checked;
  const id = todoDiv.className.replace('todo-','');
  window.api.updateTodo(id, title.textContent, description.textContent, completed)
}

window.api.todoUpdated((updatedTodo) => {
  let target = todoView.querySelector('.todo-' + updatedTodo.id)
    //let todoDiv = target.parentNode.parentNode;
    let title = target.querySelector('.todoTitle');
    let description = target.querySelector('.todoDescription');

    title.textContent = updatedTodo.title;
    description.textContent = updatedTodo.description;
    target.checked = updatedTodo.completed;
})

async function deleteTodo(event) {
  let todoDiv = event.target.parentNode.parentNode;
  console.log(todoDiv);
  const todoId = todoDiv.className.replace('todo-', '');
  console.log("ID to delete: " + todoId);
  window.api.deleteTodo(todoId);
}

window.api.todoDeleted((id) => {
  removeFromTodoView(id);
})

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

async function loadTodos(todos) {
  let todoTemplate = document.getElementById("todoTemplate");
  
  todoView = document.getElementById("todoView");
  todoTemplate = document.getElementsByTagName("template")[0];
    
  for (const t in todos) {
    appendTodoView(todos[t].id, todos[t].title, todos[t].description, todos[t].completed)
  };
  document.getElementById("loading").style.display = 'none';
}

window.addEventListener("DOMContentLoaded", async () => {
    todoView = document.getElementById("todoView");
    initializeForm();
})

function initializeForm() {
  newTodoTitle = document.getElementById("title-input");
  newTodoDescription = document.getElementById("description-input");
  newTodoForm = document.getElementById("todo-form");
  newTodoForm.addEventListener("submit", (e) => {
    console.log("submit");
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