const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoBtn = document.getElementById("todo-btn");
const todoInput = document.getElementById("todo-input");
const date = document.getElementById("date");

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

  date.innerText = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

function setTodosToLocalStorage() {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function checkIfThereAreTodosInTheLocalStorageAndPullThemInIfThereAre() {
  if (window.localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(window.localStorage.getItem("todos"));
  }
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
  setTodosToLocalStorage();
  todoInput.value = "";
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";

  checkIfThereAreTodosInTheLocalStorageAndPullThemInIfThereAre();

  todos.map((todo) => {
    const todoItem = `
    <li key="${todo.id}">
      <label >
        <input ${todo.done ? "checked" : null} type="checkbox" />
        <span ${todo.done ? 'class="todo-done"' : 'class="todo-undone"'}>${
      todo.todoText
    }</span>
      </label>
      <a class="deleteBtn">&#10005;</a>
    </li>`;
    todoList.insertAdjacentHTML("afterbegin", todoItem);
  });
}

function deleteTodo(id) {
  todos = todos.filter((todo) => {
    return todo.id != id;
  });
  setTodosToLocalStorage();
  renderTodos();
}

function toggleTodoDone(id) {
  todos.forEach((todo) => {
    if (todo.id == id) {
      todo.done = !todo.done;
    }
  });
  setTodosToLocalStorage();
  renderTodos();
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
  todoForm.addEventListener("submit", addTodos);
  todoList.addEventListener("click", checkOrDelete);
}

renderTodos();
loadEventListeners();
getDateAndDisplayIt();

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
