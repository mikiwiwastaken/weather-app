import { getWeatherDetails } from "./weather-codes.js";

const card = document.getElementById("weather-card");
const status = document.getElementById("status");
const btn = document.getElementById("search-btn");

const cityName = document.getElementById("city-name");
const weatherIcon = document.querySelector("#weather-icon i");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const recentEmpty = document.getElementById("recent-empty");
const recentList = document.getElementById("recent-list");

export function showLoading() {
  card.hidden = true;
  status.hidden = false;
  btn.disabled = true;

  status.classList.remove("status--error");
  status.textContent = "Loading...";
}

export function showError(error) {
  card.hidden = true;
  status.hidden = false;

  status.classList.add("status--error");

  if (error.code === "NOT_FOUND") {
    status.textContent = `City "${error.city}" not found.`;
  } else {
    status.textContent = "Could not load weather data. Please try again later.";
  }
}

export function showWeather(location, weather) {
  const details = getWeatherDetails(weather.current.weather_code);

  status.hidden = true;

  cityName.textContent = location.name;
  weatherIcon.className = details.icon;
  temperature.textContent = `${weather.current.temperature_2m}${weather.current_units.temperature_2m}`;
  description.textContent = details.description;
  humidity.textContent = `${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}`;
  wind.textContent = `${weather.current.wind_speed_10m}${weather.current_units.wind_speed_10m}`;

  card.hidden = false;
}

export function enableSearch() {
  btn.disabled = false;
}

export function renderRecentSearches(recentSearches) {
  recentList.innerHTML = "";

  recentEmpty.hidden = recentSearches.length > 0;

  recentSearches.forEach((search) => {
    const item = document.createElement("li");
    item.textContent = search;
    recentList.appendChild(item);
  });
}
