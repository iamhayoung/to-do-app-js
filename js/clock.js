const outputHours = document.querySelector("#js-hours"),
  outputMins = document.querySelector("#js-mins"),
  outputSecs = document.querySelector("#js-secs");

const updateClock = () => {
  const now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();

  outputHours.innerText = hours < 10 ? `0${hours}` : `${hours}`;
  outputMins.innerText = mins < 10 ? `0${mins}` : `${mins}`;
  outputSecs.innerText = secs < 10 ? `0${secs}` : `${secs}`;
}

const setClock = () => {
  window.setInterval(updateClock, 1000);
}

const clockInit = () => {
  updateClock();
  setClock();
}

clockInit();