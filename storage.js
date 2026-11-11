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
