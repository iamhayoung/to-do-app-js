const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput"),
  todoList = document.querySelector("#js-todoList");

let TODOS_ARRAY = [];
let TODOS_OBJECT;

// 지금문제점 : 1번. 투두 2개이상 입력하면 이미 로컬에 등록된것들도 중복으로 출력됨
// 지금문제점 : 2번. 페이지 리로드 후 투두입력하면 원래 있던 Todo가 새Todo에 上書きされる
// 지금문제점 : 투두 2개 입력하고 리로드하면 하나는 사라짐

// !투두 체크
const handleTodoDone = (event) => {
  console.log(event.target);
  // status
}

// !투두 삭제
const handleTodoDelete = (event) => {
  console.log(event.target);
}

const printTodos = (todoValue) => {
  // 요소 생성
  const li = document.createElement("li");
  const div = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");

  // todo텍스트 출력
  label.innerText = todoValue;

  // toDo id번호 설정
  let number = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

  // element 출력
  div.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  label.setAttribute("for", number);
  checkbox.setAttribute("id", number);
  checkbox.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.appendChild(div);
  div.append(checkbox, label, delBtn);

  TODOS_OBJECT = { "id": number, "todo": todoValue, "status": "new" }

  TODOS_ARRAY.push(TODOS_OBJECT);

  setTodosLocalStorage()

  // delBtn클릭했을때 삭제함수 실행
  delBtn.addEventListener('click', handleTodoDelete);

  // checkbox클릭했을때 Done
  checkbox.addEventListener('click', handleTodoDone);
}

const loadTodos = () => {
  const lsTodos = localStorage.getItem("toDo");  // 로컬스토리지에 저장된 todo를 불러옴
  console.log(TODOS_ARRAY)

  if (lsTodos !== null) {
    // 로컬스토리지 toDo에 내용물이 있으면
    const parsedLsTodos = JSON.parse(lsTodos); // 로컬스토리지 toDo를 객체로 변환
    console.log("yeah")
    console.log(TODOS_ARRAY)
    parsedLsTodos.forEach(lsTodo => {
      const savedTodo = lsTodo.todo; // 로컬스토리지에 저장된 각각의 todo
      printTodos(savedTodo); // 로컬스토리지에서 불러온 Todo를 화면에 프린트
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
  loadTodos(); // 이건 확실히 필요함
  todoForm.addEventListener("submit", handleTodoSubmit);
}

todoInit();
