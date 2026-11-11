import { getLocation, getWeather } from "./weather-api.js";
import {
  showLoading,
  showError,
  showWeather,
  enableSearch,
  renderRecentSearches,
  highlightSelectedTemperatureUnit,
  updateTemperature,
} from "./ui.js";
import {
  saveCities,
  loadCities,
  saveTemperatureUnit,
  loadTemperatureUnit,
} from "./storage.js";

const searchForm = document.getElementById("search-form");
const recentList = document.getElementById("recent-list");
const clearHistoryBtn = document.getElementById("clear-history");
const temperatureOptions = document.getElementById("temperature-options");

let cityInput = document.getElementById("city-input");
let recentSearches;
let currentUnit;
let latestSearchId = 0;

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
    recentSearches = recentSearches.filter(
      (recentSearch) => recentSearch !== item.dataset.city,
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

temperatureOptions.addEventListener("click", (event) => {
  const temperatureSwitchBtn = event.target.closest(".temperature-switch__btn");
  if (!temperatureSwitchBtn) return;

  currentUnit = temperatureSwitchBtn.dataset.unit;

  saveTemperatureUnit(currentUnit);
  highlightSelectedTemperatureUnit(currentUnit);
  updateTemperature(currentUnit);
});

async function searchWeather(city) {
  const searchId = ++latestSearchId;

  try {
    showLoading();

    const location = await getLocation(city);
    if (searchId !== latestSearchId) return; // a newer search has started

    const weather = await getWeather(location.latitude, location.longitude);
    if (searchId !== latestSearchId) return;

    showWeather(location, weather, currentUnit);

    recentSearches = recentSearches.filter((city) => city !== location.name);
    recentSearches.unshift(location.name);
    if (recentSearches.length > 5) recentSearches.pop();

    updateRecentSearches();
  } catch (error) {
    if (searchId !== latestSearchId) return; // ignore errors of outdated searches

    console.error(error);
    showError(error);
  } finally {
    // Only the latest search may re-enable the button
    if (searchId === latestSearchId) enableSearch();
  }
}

function updateRecentSearches() {
  saveCities(recentSearches);
  renderRecentSearches(recentSearches);
}

function init() {
  recentSearches = loadCities() ?? [];
  currentUnit = loadTemperatureUnit() ?? "celsius";

  renderRecentSearches(recentSearches);
  highlightSelectedTemperatureUnit(currentUnit);
}

init();
