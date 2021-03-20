const weather = document.querySelector("#js-weather");

const API_KEY = "4ea346d8d7cecd5654877211ee09c0cf";

let lat;
let lon;

const loadAPI = (lat, lon) => {
  lat = lat;
  lon = lon;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Fetch error:', error);
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