const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput"),
  todoList = document.querySelector("#js-todoList");

let TODOS_ARRAY = [];
let TODOS_OBJECT = [];
let i = 1;

// !투두 체크
const handleTodoDone = (event) => {
  console.log(event.target);
}

// !투두 삭제
const handleTodoDelete = (event) => {
  console.log(event.target);
}

const printTodos = () => {
  // 요소 생성
  const li = document.createElement("li");
  const div = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");
  // !todo텍스트 출력
  label.innerText = TODOS_OBJECT.todo;

  // element 출력
  div.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  label.setAttribute("for", TODOS_OBJECT.id);
  checkbox.setAttribute("id", TODOS_OBJECT.id);
  checkbox.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.appendChild(div);
  div.append(checkbox, label, delBtn);

  // delBtn클릭했을때 삭제함수 실행
  delBtn.addEventListener('click', handleTodoDelete);

  // checkbox클릭했을때 Done
  checkbox.addEventListener('click', handleTodoDone);
}

const setTodosLocalStorage = () => {
  localStorage.setItem("toDo", TODOS_ARRAY);
  printTodos();
}

const handleTodoSubmit = (event) => {
  event.preventDefault();
  let todosValue = todoInput.value;
  let number = i++;
  TODOS_OBJECT = { "id": number,"todo": todosValue }

  //! 페이지 리로드 후 투두입력하면 원래 있던 Todo가 새Todo에 上書きされる

  if (todosValue) {
    TODOS_ARRAY.push(JSON.stringify(TODOS_OBJECT));
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