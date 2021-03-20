const greetingsForm = document.querySelector("#js-greetingsForm"),
  greetingsInput = document.querySelector("#js-greetingsInput"),
  greetingsText = document.querySelector("#js-greetingsText");

const printGreetings = (userNameValue) => {
  greetingsText.innerText = `Hello, ${userNameValue}🙌`;
  greetingsText.classList.add("showing");
}

const setUserNameLocalStorage = (userNameValue) => {
  // 로컬스토리지 userName에 값이 있을때만 값을 셋팅하기.
  localStorage.setItem('userName', userNameValue);

  // 만약에 로컬스토리지userName에 값이 있으면 보여주게 하기
  greetingsForm.classList.remove("showing");
  printGreetings(userNameValue);
}

const handleGreetingsSubmit = (event) => {
  event.preventDefault();
  let userNameValue = greetingsInput.value;
  setUserNameLocalStorage(userNameValue);
}

const greetingsInit = () => {
  // 로컬스토리지 userName에 값이 있으면 첫화면은 인사말띄우기
  greetingsForm.addEventListener("submit", handleGreetingsSubmit)
}

greetingsInit();