import { getLocation, getWeather } from "./weather-api.js";
import {
  showLoading,
  showError,
  showWeather,
  enableSearch,
  renderRecentSearches,
} from "./ui.js";
import { saveRecentSearches, loadRecentSearches } from "./storage.js";

const cityInput = document.getElementById("city-input");
let recentSearches = loadRecentSearches() ? loadRecentSearches() : [];

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

    recentSearches = recentSearches.filter((search) => search !== cityName);
    recentSearches.push(cityName);
    if (recentSearches.length > 5) recentSearches.shift();

    saveRecentSearches(recentSearches);
    renderRecentSearches(recentSearches);
  } catch (error) {
    console.error(error);
    showError(error);
  } finally {
    enableSearch();
  }
}

renderRecentSearches(recentSearches);
