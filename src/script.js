function displayDate() {
  let now = new Date();
  let hour = now.getHours();

  if (hour > 18) {
    document.getElementById("img").src = "night 1.jpg";
  }

  let minute = now.getMinutes();
  if (minute.toString().length < 2) {
    minute = "0" + minute;
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

function formatDate(date) {
  let forecastNow = new Date(date * 1000);
  let day = forecastNow.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  forecast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-2">
  <div class="forecast-day">${formatDate(forecastday.time)}</div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastday.condition.icon
          }.png" width="42" id="forecast-icon" />
          <div class="forecast-temperature">
            <span class="max-temp-forcast">${Math.round(
              forecastday.temperature.maximum
            )}°/</span>
            <span class="min-temp-forecast">${Math.round(
              forecastday.temperature.minimum
            )}°</span>
          
          </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getCoordinate(coordinates) {
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let apiKey = "664c139fao009ab4f0e6872f57fc202t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showForecast);
}

function showTemp(response) {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = ` ${response.data.condition.description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity: ${response.data.temperature.humidity}`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} mph`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getCoordinate(response.data.coordinates);
}
function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-bar");
  let h1 = document.querySelector("h1");
  h1.innerHTML = search.value;

  let city = search.value;
  let apiKey = "664c139fao009ab4f0e6872f57fc202t";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios
    .get(`${apiUrl}query=${city}&key=${apiKey}&units=imperial`)
    .then(showTemp);
}

let searchTab = document.querySelector("#search-button");
searchTab.addEventListener("click", searchCity);

function currentCity(response) {
  console.log(response);

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = `
${response.data.condition.description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = ` Humidity:
${response.data.temperature.humidity}`;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = ` Wind:
${Math.round(response.data.wind.speed)} mph`;
  let feel = document.querySelector("#est_temp");
  feel.innerHTML = ` Feels like:
${Math.round(response.data.temperature.feels_like)}°`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  let forecastCol = document.querySelector("#forecast");
  forecastCol.innerHTML = null;
}
function currentCoordinates(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "664c139fao009ab4f0e6872f57fc202t";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios
    .get(`${apiUrl}lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`)
    .then(currentCity);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCoordinates);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentPosition);
