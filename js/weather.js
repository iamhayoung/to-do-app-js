const tempOutput = document.querySelector("#js-temp"),
  areaOutput = document.querySelector("#js-area"),
  skyOutput = document.querySelector("#js-sky")

const API_KEY = "4ea346d8d7cecd5654877211ee09c0cf";

let lat;
let lon;

const printWeather = (temp, area, sky) => {
  tempOutput.innerText = `${temp}°`;
  areaOutput.innerText = area;
  skyOutput.innerText = sky;
}

const getWeather = (data) => {
  let temp = data.main.temp;
  let area = data.name;
  let sky = data.weather[0].main;
  printWeather(temp, area, sky);
}

const loadAPI = (lat, lon) => {
  lat = lat;
  lon = lon;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => getWeather(data))
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

const getCoords = (position) => {
  let coords = position.coords;
  lat = coords.latitude;
  lon = coords.longitude;

  loadAPI(lat, lon);
}

const viewError = (error) => {
  console.log(error)
  console.warn(`ERROR(${error.code}): ${error.message}`);
}

const weatherInit = () => {
  navigator.geolocation.getCurrentPosition(getCoords, viewError);
}

weatherInit();