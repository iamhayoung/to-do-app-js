const background = document.querySelector("#js-background");

const setBackground = () => {
  let backgroundNum = Math.floor(Math.random() * 7) + 1;
  background.style.backgroundImage = `url(../img/${backgroundNum}.jpg)`;
}

const backgroundInit = () => {
  setBackground();
}

backgroundInit();