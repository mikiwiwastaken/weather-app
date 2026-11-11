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
let cities = [];

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
    const dataCity = item.dataset.city;
    cities = cities.filter((city) => city !== dataCity);

    updateRecentSearches();
  } else {
    cityInput.value = item.dataset.city;
    searchWeather(cityInput.value);
  }
});

clearHistoryBtn.addEventListener("click", () => {
  cities = [];
  updateRecentSearches();
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

    updateRecentSearches();
  } catch (error) {
    console.error(error);
    showError(error);
  } finally {
    enableSearch();
  }
}

function updateRecentSearches() {
  saveCities(cities);
  renderRecentSearches(cities);
}

function init() {
  if (loadCities()) cities = loadCities();
  renderRecentSearches(cities);
}

init();
