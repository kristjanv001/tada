const todoListUl = document.getElementById("todo-list-ul");
const todoAddWrapper = document.getElementById("todo-add-wrapper");
const todoBtn = document.getElementById("todo-btn");

const todos = [];

let newTodoText = "";

function addTodoToDOM(e) {
  e.preventDefault();
  const todoItem = `<li>
    <label class="checkbox-container">
      <input type="checkbox" />
      <span >${e.target[0].value}</span>
    </label>
    <a class="deleteBtn">🞨</a>
    </li>`;
  todoListUl.insertAdjacentHTML("afterbegin", todoItem);
  document.getElementById("todo-input").value = "";
}

function checkOrDelete(e) {
  if (e.target.className === "deleteBtn")
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

  if (e.target.type === "checkbox" && e.target.checked)
    e.target.nextSibling.nextSibling.style.textDecoration = "line-through";

  if (e.target.type === "checkbox" && !e.target.checked)
    e.target.nextSibling.nextSibling.style.textDecoration = "none";
}

function loadEventListeners() {
  todoAddWrapper.addEventListener("submit", addTodoToDOM);
  todoListUl.addEventListener("click", checkOrDelete);
}

loadEventListeners();

// function addTodo(text) {
//   todos.push({
//     id: Date.now(),
//     todoText: text,
//     done: false,
//   });
// }

// todoAddWrapper.addEventListener("keyup", (e) => {
//   newTodoText = e.target.value;
// });

// todoAddWrapper.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (newTodoText) {
//     addTodoToDOM(newTodoText);
//     document.getElementById("todo-input").value = "";
//   }
// });
