import { getLocation, getWeather } from "./weather-api.js";
import { showLoading, showError, showWeather, enableSearch } from "./ui.js";
import { saveLastCity, loadLastCity } from "./storage.js";

const cityInput = document.getElementById("city-input");

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const cityName = cityInput.value.trim();
  if (cityName === "") return;
  searchWeather(cityName);
});

async function searchWeather(cityName) {
  try {
    showLoading();

    const location = await getLocation(cityName);
    const weather = await getWeather(location.latitude, location.longitude);

    showWeather(location, weather);

    saveLastCity(cityName);
  } catch (error) {
    console.error(error);
    showError(error);
  } finally {
    enableSearch();
  }
}

function init() {
  const cityName = loadLastCity();
  if (!cityName) return;

  cityInput.value = cityName;
  searchWeather(cityName);
}

init();
