const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput"),
  todoList = document.querySelector("#js-todoList");

let TODOS_ARRAY = [];
let i = 1;

// !투두 체크

// !투두 삭제

const printTodos = () => {
  // 요소 생성
  const li = document.createElement("li");
  const div = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");
  div.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  label.setAttribute("for", "todoCheck");
  checkbox.setAttribute("id", "todoCheck");
  checkbox.setAttribute("type", "checkbox");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  todoList.appendChild(li);
  li.appendChild(div);
  div.append(label, checkbox, delBtn);

  // !todo 출력
  div.innerText = TODOS_ARRAY;

}

const setTodosLocalStorage = () => {
  localStorage.setItem("toDo", TODOS_ARRAY);
  printTodos();
}

const handleTodoSubmit = (event) => {
  event.preventDefault();
  let todosValue = todoInput.value;
  let number = i++;

  //! 페이지 리로드 후 투두입력하면 원래 있던 Todo가 새Todo에 上書きされる

  if (todosValue) {
    TODOS_ARRAY.push(JSON.stringify({ "id": number,"todo": todosValue }));
    setTodosLocalStorage();
    todoForm.reset(); // todo 입력하고 submit후에는 todoInput창을 clear
  } else {
    // todo가 입력되지 않은채로 submit하면 에러창 표시
    alert('Please enter item.')
  }
}

const checkTodosLocalStorage = () => {
  const savedTodo = localStorage.getItem("toDo");

  if (savedTodo) {
    console.log('savedTodo')
    printTodos();
  } else {
    return;
  }
}

const todoInit = () => {
  checkTodosLocalStorage();
  todoForm.addEventListener("submit", handleTodoSubmit);
}

todoInit();