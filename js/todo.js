const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput"),
  todoList = document.querySelector("#js-todoList");

let TODOS_ARRAY = [];
let TODOS_OBJECT;

// 유저명, 투두 리셋
const handleReset = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("toDo");
  location.reload();
  return false;
}

// !투두 체크
// status가 done일때 또 누르면 스테이터스가 new로 바뀜
const handleTodoStatus = (event) => {
  const getId = event.target.id; // 선택한 todo의 id취득
  const id = parseInt(getId); // 취득한 id를 숫자로 만들어줌
  const li = event.target.parentNode;

  TODOS_ARRAY.forEach(todo => {
    if (todo.id === id && (todo.status === "new")) {
      console.log('done')
      todo.status = "done";
      li.classList.add("todo__checkbox__done");
    } else if (todo.id === id && (todo.status === "done")) {
      console.log('new')
      todo.status = "new";
      li.classList.remove("todo__checkbox__done");
    }
  });

  localStorage.setItem("toDo", JSON.stringify(TODOS_ARRAY));
}

// 투두 삭제
const handleTodoDelete = (event) => {
  const getId = event.target.parentNode.previousElementSibling.htmlFor; // 삭제할 todo의 id취득
  const id = parseInt(getId) // 취득한 id를 숫자로 만들어줌
  const li = event.target.parentNode.parentNode;
  li.remove(); // 삭제버튼 클릭된 li 삭제

  // 삭제할 id와 로컬스토리지의 id를 비교해서,
  // 삭제할 id와 로컬스토리지의 id가 같지 않은 녀석들만 새로운 배열로 걸러냄
  const remainTodosArray = TODOS_ARRAY.filter(todo => {
    return todo.id !== id;
  });
  // 삭제 안할 애들만 남은 배열을 TODOS_ARRAY로 푸쉬
  TODOS_ARRAY = remainTodosArray;
  localStorage.setItem("toDo", JSON.stringify(TODOS_ARRAY));
}

const printTodos = (todoValue) => {
  // 요소 생성
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");

  // todo텍스트 출력
  label.innerText = todoValue;

  // toDo id번호 설정
  let number = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

  // element 출력
  li.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  label.setAttribute("for", number);
  checkbox.setAttribute("id", number);
  checkbox.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.append(checkbox, label, delBtn);

  TODOS_OBJECT = { "id": number, "todo": todoValue, "status": "new" }
  TODOS_ARRAY.push(TODOS_OBJECT);

  setTodosLocalStorage();

  // delBtn클릭했을때 삭제함수 실행
  delBtn.addEventListener('click', handleTodoDelete);

  // checkbox클릭했을때 todo status변경
  checkbox.addEventListener('click', handleTodoStatus);
}

const printSavedTodos = (savedTodo, savedStatus) => {
    // 요소 생성
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");

  // todo텍스트 출력
  label.innerText = savedTodo;

  // toDo id번호 설정
  let number = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

  // element 출력
  li.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  label.setAttribute("for", number);
  checkbox.setAttribute("id", number);
  checkbox.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.append(checkbox, label, delBtn);

  TODOS_OBJECT = { "id": number, "todo": savedTodo, "status": savedStatus }
  if (savedStatus === "done") {
    li.classList.add("todo__checkbox__done");
    checkbox.checked = true;
  } else if (savedStatus === "new") {
    li.classList.remove("todo__checkbox__done");
    checkbox.checked = false;
  }
  TODOS_ARRAY.push(TODOS_OBJECT);

  setTodosLocalStorage();

  // delBtn클릭했을때 삭제함수 실행
  delBtn.addEventListener('click', handleTodoDelete);

  // checkbox클릭했을때 todo status변경
  checkbox.addEventListener('click', handleTodoStatus);
}

const loadTodos = () => {
  const lsTodos = localStorage.getItem("toDo");  // 로컬스토리지에 저장된 todo를 불러옴
  const parsedLsTodos = JSON.parse(lsTodos); // 로컬스토리지 toDo를 객체로 변환

  if (lsTodos !== null) {
    // 로컬스토리지 toDo에 내용물이 있으면
    parsedLsTodos.forEach(lsTodo => {
      const savedTodo = lsTodo.todo; // 로컬스토리지에 저장된 각각의 todo
      const savedStatus = lsTodo.status;
      printSavedTodos(savedTodo, savedStatus); // 로컬스토리지에서 불러온 Todo를 화면에 프린트
    })
  } else {
    // 로컬스토리지 toDo에 내용물이 없으면
    console.error("there's nothing todo")
    return;
  }
}

const setTodosLocalStorage = () => {
  localStorage.setItem("toDo", JSON.stringify(TODOS_ARRAY));
}

const handleTodoSubmit = (event) => {
  event.preventDefault();
  let todoValue = todoInput.value;

  if (todoValue) {
    printTodos(todoValue); // 투두출력
    todoForm.reset(); // todo 입력하고 submit후에는 todoInput창을 clear
  } else {
    // todo가 입력되지 않은채로 submit하면 에러창 표시
    alert('Please enter the item.')
  }
}

const todoInit = () => {
  loadTodos();
  todoForm.addEventListener("submit", handleTodoSubmit);
  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all data including your name and to-dos?")) {
      console.log('Okay');
      handleReset();
    } else {
      console.log('Cancel');
    }
  });
}

todoInit();
