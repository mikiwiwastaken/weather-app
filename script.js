import { getLocation, getWeather } from "./weather.js";
import { showLoading, showError, showWeather } from "./ui.js";

const card = document.getElementById("weather-card");
const status = document.getElementById("status");
const btn = document.getElementById("search-btn");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      showLoading(card, status, btn);

      const location = await getLocation(
        document.getElementById("city-input").value.trim(),
      );
      const weather = await getWeather(location.latitude, location.longitude);

      showWeather(
        location,
        weather,
        card,
        status,
        cityName,
        temperature,
        humidity,
        wind,
      );
    } catch (error) {
      console.error(error);
      showError(card, status, error);
    } finally {
      btn.disabled = false;
    }
  });
