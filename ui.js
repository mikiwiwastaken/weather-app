export function showLoading(card, status, btn) {
  card.hidden = true;
  status.hidden = false;
  btn.disabled = true;

  status.classList.remove("status--error");
  status.textContent = "Loading...";
}

export function showError(card, status, error) {
  card.hidden = true;
  status.hidden = false;

  status.classList.add("status--error");

  if (error.code === "NOT_FOUND") {
    status.textContent = `City "${error.city}" not found.`;
  } else {
    status.textContent = "Could not load weather data. Please try again later.";
  }
}

export function showWeather(
  location,
  weather,
  card,
  status,
  cityName,
  temperature,
  humidity,
  wind,
) {
  status.hidden = true;

  cityName.textContent = location.name;
  // TODO: add weather icon
  temperature.textContent = `${weather.current.temperature_2m}${weather.current_units.temperature_2m}`;
  // TODO: add description
  humidity.textContent = `${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}`;
  wind.textContent = `${weather.current.wind_speed_10m}${weather.current_units.wind_speed_10m}`;

  card.hidden = false;
}
