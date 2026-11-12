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
  CityStorage,
  saveTemperatureUnit,
  loadTemperatureUnit,
} from "./storage.js";
import { DEFAULT_UNIT } from "./units.js";

const searchForm = document.getElementById("search-form");
const recentList = document.getElementById("recent-list");
const clearHistoryBtn = document.getElementById("clear-history");
const temperatureOptions = document.getElementById("temperature-options");
const cityInput = document.getElementById("city-input");

let currentUnit;
let latestSearchId = 0;

const cityStorage = new CityStorage();

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
    cityStorage.remove(item.dataset.city);
    renderRecentSearches(cityStorage.getAll());
  } else {
    cityInput.value = item.dataset.city;
    searchWeather(cityInput.value);
  }
});

clearHistoryBtn.addEventListener("click", () => {
  cityStorage.clear();
  renderRecentSearches(cityStorage.getAll());
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

    cityStorage.add(location.name);
    renderRecentSearches(cityStorage.getAll());
  } catch (error) {
    if (searchId !== latestSearchId) return; // ignore errors of outdated searches

    console.error(error);
    showError(error);
  } finally {
    // Only the latest search may re-enable the button
    if (searchId === latestSearchId) enableSearch();
  }
}

function init() {
  currentUnit = loadTemperatureUnit() ?? DEFAULT_UNIT;
  renderRecentSearches(cityStorage.getAll());
  highlightSelectedTemperatureUnit(currentUnit);
}

init();
