const greetingsForm = document.querySelector("#js-greetingsForm"),
  greetingsInput = document.querySelector("#js-greetingsInput"),
  greetingsOutputText = document.querySelector("#js-greetingsOutputText"),
  greetingsIntroText = document.querySelector("#js-greetingsIntroText"),
  clock = document.querySelector("#js-clock");

const printGreetings = (userName) => {
  greetingsOutputText.innerText = `Hello, ${userName}🙌`;
  greetingsOutputText.classList.add("showing");
}

const setUserNameLocalStorage = (userName) => {
  localStorage.setItem("userName", userName);
  greetingsForm.classList.remove("showing");
  printGreetings(userName);
}

const handleGreetingsSubmit = (event) => {
  event.preventDefault();
  clock.classList.add("showing")
  greetingsIntroText.classList.add("hidden");
  let userName = greetingsInput.value;
  setUserNameLocalStorage(userName);
}

const checkUserNameLocalStorage = () => {
  const savedUserName = localStorage.getItem("userName");

  if (savedUserName) {
    // 로컬스토리지 userName 값이 존재한다면
    clock.classList.add("showing")
    greetingsOutputText.classList.add("showing");
    greetingsOutputText.innerText = `Hello, ${savedUserName}🙌`;
  } else {
    // 로컬스토리지 userName 값이 존재하지 않는다면
    greetingsIntroText.classList.add("showing");
    greetingsForm.classList.add("showing");
  }
}

const greetingsInit = () => {
  checkUserNameLocalStorage();
  greetingsForm.addEventListener("submit", handleGreetingsSubmit)
}

greetingsInit();