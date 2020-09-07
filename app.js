const todoListUl = document.getElementById("todo-list-ul");
const todoAddForm = document.getElementById("todo-add-wrapper");
const todoBtn = document.getElementById("todo-btn");
const todoInput = document.getElementById("todo-input");
const dateHeader = document.getElementById("date");

let todos = [];

function getDateAndDisplayIt() {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();

  dateHeader.innerText = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

function addTodos(e) {
  e.preventDefault();

  if (todoInput.value) {
    todos.push({
      id: Date.now(),
      todoText: todoInput.value,
      done: false,
    });
  }
  renderTodos();
}

function renderTodos() {
  todoListUl.innerHTML = "";

  todos.map((todo) => {
    const todoItem = `
    <li key="${todo.id}">
      <label >
        <input ${todo.done ? "checked" : null} type="checkbox" />
        <span ${todo.done ? 'class="todo-done"' : 'class="todo-undone"'}>${
      todo.todoText
    }</span>
      </label>
      <a class="deleteBtn">🞨</a>
    </li>`;
    todoListUl.insertAdjacentHTML("afterbegin", todoItem);
  });
  console.log(todos);
}

function deleteTodo(id) {
  todos = todos.filter((item) => {
    return item.id != id;
  });
  renderTodos();
}

function toggleTodoDone(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.done = !todo.done;
    }
    renderTodos();
  });
}

function checkOrDelete(e) {
  if (e.target.className === "deleteBtn") {
    deleteTodo(e.target.parentElement.getAttribute("key"));
  }
  if (e.target.type === "checkbox") {
    toggleTodoDone(e.target.parentElement.parentElement.getAttribute("key"));
  }
}

function loadEventListeners() {
  todoAddForm.addEventListener("submit", addTodos);
  todoListUl.addEventListener("click", checkOrDelete);
}

loadEventListeners();
getDateAndDisplayIt();

// ls
// window.localStorage.setItem("todos", JSON.stringify(todos));
// console.log(JSON.parse(window.localStorage.getItem("todos")));
// window.localStorage.clear();
