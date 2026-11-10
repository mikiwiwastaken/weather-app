import { getLocation, getWeather } from "./weather-api.js";
import {
  showLoading,
  showError,
  showWeather,
  enableSearch,
  renderRecentSearches,
} from "./ui.js";
import { saveCities, loadCities } from "./storage.js";

const cityInput = document.getElementById("city-input");
let cities = loadCities() ? loadCities() : [];

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city === "") return;
  searchWeather(city);
});

async function searchWeather(city) {
  try {
    showLoading();

    const location = await getLocation(city);
    const weather = await getWeather(location.latitude, location.longitude);
    const cityName = location.name;

    showWeather(location, weather);

    cities = cities.filter((city) => city !== cityName);
    cities.unshift(cityName);
    if (cities.length > 5) cities.pop();

    saveCities(cities);
    renderRecentSearches(cities);
  } catch (error) {
    console.error(error);
    showError(error);
  } finally {
    enableSearch();
  }
}

renderRecentSearches(cities);
