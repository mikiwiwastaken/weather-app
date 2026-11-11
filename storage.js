export function saveCities(cities) {
  try {
    localStorage.setItem("cities", JSON.stringify(cities));
  } catch (error) {
    console.error(error);
  }
}

export function loadCities() {
  try {
    const cities = JSON.parse(localStorage.getItem("cities"));
    return Array.isArray(cities) ? cities : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function saveTemperatureUnit(temperatureUnit) {
  try {
    localStorage.setItem("temperature_unit", temperatureUnit);
  } catch (error) {
    console.error(error);
  }
}

export function loadTemperatureUnit() {
  try {
    const temperatureUnit = localStorage.getItem("temperature_unit");
    return temperatureUnit;
  } catch (error) {
    console.error(error);
    return null;
  }
}
