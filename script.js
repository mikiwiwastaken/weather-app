import { getLocation, getWeather } from "./weather.js";

document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const card = document.getElementById("weather-card");

    try {
      const location = await getLocation(
        document.getElementById("city-input").value.trim(),
      );
      const weather = await getWeather(location.latitude, location.longitude);

      card.hidden = false;
      document.getElementById("city-name").textContent = location.name;
      // TODO: add weather icon
      document.getElementById("temperature").textContent =
        `${weather.current.temperature_2m}${weather.current_units.temperature_2m}`;
      // TODO: add description
      document.getElementById("humidity").textContent =
        `${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}`;
      document.getElementById("wind").textContent =
        `${weather.current.wind_speed_10m}${weather.current_units.wind_speed_10m}`;
    } catch (error) {
      card.hidden = true;
      console.error(error);
    }
  });
