export function saveCities(searches) {
  try {
    localStorage.setItem("cities", JSON.stringify(searches));
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
