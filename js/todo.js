const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput"),
  todoList = document.querySelector("#js-todoList");

// !투두 체크

// !투두 삭제

const printTodos = (todos) => {
  console.log(todos)
  // li생성
  const li = document.createElement("li");
  const div = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");
  todoList.appendChild(li);
  li.appendChild(div);
  div.append(label, checkbox, delBtn);
  div.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  label.setAttribute("for", "todoCheck");
  checkbox.setAttribute("id", "todoCheck");
  checkbox.setAttribute("type", "checkbox");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  div.innerText = todos; // div에 todo텍스트 출력

  // div의 자식 label, checkbox
}

const setTodosLocalStorage = (todos) => {
  localStorage.setItem("toDo", todos);
  printTodos(todos);
}

const handleTodoSubmit = (event) => {
  event.preventDefault();
  let todos = todoInput.value;
  // !todo한개 입력하고 나면 todoInput창 비워야함

  setTodosLocalStorage(todos);
}

const todoInit = () => {
  todoForm.addEventListener("submit", handleTodoSubmit);
}

todoInit();