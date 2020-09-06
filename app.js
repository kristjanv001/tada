const todoListUl = document.getElementById("todo-list-ul");
const todoAddWrapper = document.getElementById("todo-add-wrapper");
const todoBtn = document.getElementById("todo-btn");
const todoInput = document.getElementById("todo-input");
const dateHeader = document.getElementById("date");

const todos = [];

let newTodoText = "";

console.log(dateHeader.innerText);

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

function addTodoToDOM(e) {
  e.preventDefault();
  const todoItem = `<li>
    <label class="checkbox-container">
      <input type="checkbox" />
      <span >${e.target[0].value}</span>
    </label>
    <a class="deleteBtn">🞨</a>
    </li>`;
  if (todoInput.value) {
    todoListUl.insertAdjacentHTML("afterbegin", todoItem);
    todoInput.value = "";
  }
}

function checkOrDelete(e) {
  if (e.target.className === "deleteBtn")
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

  if (e.target.type === "checkbox" && e.target.checked) {
    e.target.nextSibling.nextSibling.style.textDecoration = "line-through";
    e.target.nextSibling.nextSibling.style.color = "gray";
  }

  if (e.target.type === "checkbox" && !e.target.checked) {
    e.target.nextSibling.nextSibling.style.textDecoration = "none";
    e.target.nextSibling.nextSibling.style.color = "";
  }
}

function loadEventListeners() {
  todoAddWrapper.addEventListener("submit", addTodoToDOM);
  todoListUl.addEventListener("click", checkOrDelete);
}

loadEventListeners();
getDateAndDisplayIt();

// function addTodo(text) {
//   todos.push({
//     id: Date.now(),
//     todoText: text,
//     done: false,
//   });
// }
