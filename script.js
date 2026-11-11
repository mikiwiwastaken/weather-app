import { getLocation, getWeather } from "./weather-api.js";
import {
  showLoading,
  showError,
  showWeather,
  enableSearch,
  renderRecentSearches,
} from "./ui.js";
import { saveCities, loadCities } from "./storage.js";

const searchForm = document.getElementById("search-form");
const recentList = document.getElementById("recent-list");
const clearHistoryBtn = document.getElementById("clear-history");

let cityInput = document.getElementById("city-input");
let recentSearches = [];

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (city === "") return;
  searchWeather(city);
});

recentList.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;

  if (event.target.closest(".recent-searches__remove")) {
    const city = item.dataset.city;
    recentSearches = recentSearches.filter(
      (recentSearch) => recentSearch !== city,
    );

    updateRecentSearches();
  } else {
    cityInput.value = item.dataset.city;
    searchWeather(cityInput.value);
  }
});

clearHistoryBtn.addEventListener("click", () => {
  recentSearches = [];
  updateRecentSearches();
});

async function searchWeather(city) {
  try {
    showLoading();

    const location = await getLocation(city);
    const weather = await getWeather(location.latitude, location.longitude);
    const cityName = location.name;

    showWeather(location, weather);

    recentSearches = recentSearches.filter((city) => city !== cityName);
    recentSearches.unshift(cityName);
    if (recentSearches.length > 5) recentSearches.pop();

    updateRecentSearches();
  } catch (error) {
    console.error(error);
    showError(error);
  } finally {
    enableSearch();
  }
}

function updateRecentSearches() {
  saveCities(recentSearches);
  renderRecentSearches(recentSearches);
}

function init() {
  if (loadCities()) recentSearches = loadCities();
  renderRecentSearches(recentSearches);
}

init();
