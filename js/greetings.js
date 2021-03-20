const greetingsForm = document.querySelector("#js-greetingsForm"),
  greetingsInput = document.querySelector("#js-greetingsInput"),
  greetingsText = document.querySelector("#js-greetingsText");

const handleGreetingsSubmit = (event) => {
  event.preventDefault();
  let greetingsValue = greetingsInput.value;
  greetingsValue = "";
}

const greetingsInit = () => {
  greetingsForm.addEventListener("submit", handleGreetingsSubmit)
}

greetingsInit();