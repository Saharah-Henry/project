function displayDate() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    alert(`0${hour}`);
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    alert(`0${minute}`);
  }
  let time = `${hour}:${minute}`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let formatted_date = `${day} ${time}`;
  let date = document.querySelector("#date");
  date.innerHTML = `${formatted_date}`;
}
displayDate();

function showTemp(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather");
  weather.innerHTML = ` ${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity: ${response.data.main.humidity}%`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like: ${Math.round(response.data.main.feels_like)}°`;
}
function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-bar");
  let h1 = document.querySelector("h1");
  h1.innerHTML = search.value;

  let city = search.value;
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios.get(`${apiUrl}${city}&appid=${apiKey}&units=metric`).then(showTemp);
}

let searchTab = document.querySelector("#search-tab");
searchTab.addEventListener("submit", searchCity);

function currentCity(response) {
  console.log(response);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weather = document.querySelector("#weather");
  weather.innerHTML = ` ${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity: ${response.data.main.humidity}%`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like: ${Math.round(response.data.main.feels_like)}°`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}
function navGeo(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(currentCity);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(navGeo);
}

let current = document.querySelector("#current-tab");
current.addEventListener("submit", currentPosition);
