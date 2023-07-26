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
  console.log(response);

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let weather = document.querySelector("#weather");
  weather.innerHTML = ` ${response.data.condition.description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity: ${response.data.temperature.humidity}`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} m/s`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  celsiusTemp = response.data.temperature.current;
}
function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-bar");
  let h1 = document.querySelector("h1");
  h1.innerHTML = search.value;

  let city = search.value;
  let apiKey = "664c139fao009ab4f0e6872f57fc202t";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios.get(`${apiUrl}query=${city}&key=${apiKey}&units=metric`).then(showTemp);
}
function degreeF(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let fahrenheitElement = celsiusTemp * 1.8 + 32;
  temperature.innerHTML = Math.round(fahrenheitElement);
}
function degreeC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let searchTab = document.querySelector("#search-tab");
searchTab.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", degreeF);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", degreeC);
