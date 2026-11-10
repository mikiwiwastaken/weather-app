import { getLocation, getWeather } from "./weather-api.js";
import { showLoading, showError, showWeather, enableSearch } from "./ui.js";

document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      showLoading();

      const location = await getLocation(
        document.getElementById("city-input").value.trim(),
      );
      const weather = await getWeather(location.latitude, location.longitude);

      showWeather(location, weather);
    } catch (error) {
      console.error(error);
      showError(error);
    } finally {
      enableSearch();
    }
  });
