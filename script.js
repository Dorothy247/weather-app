const apiKey = "a298426875380d10eb5b024b34c1787c";
const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("weather-icon");
const forecastEl = document.getElementById("forecast");

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = Math.round(data.main.temp);
  description.textContent = `${new Date().toLocaleString()}, ${data.weather[0].description}`;
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function searchCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then(displayWeather)
    .catch((err) => alert("City not found"));
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchCity(cityInput.value);
});
