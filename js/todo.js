const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput");

const setTodosLocalStorage = (todos) => {
  console.log(todos)
}

const handleTodoSubmit = (event) => {
  event.preventDefault();
  let todos = todoInput.value;
  // todo한개 입력하고 나면 todoInput창 비워야함

  setTodosLocalStorage(todos);
}

const todoInit = () => {
  todoForm.addEventListener("submit", handleTodoSubmit);
}

todoInit();