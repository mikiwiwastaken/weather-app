export function saveLastCity(city) {
  try {
    localStorage.setItem("city", city);
  } catch (error) {
    console.error(error);
  }
}

export function loadLastCity() {
  try {
    return localStorage.getItem("city");
  } catch (error) {
    console.error(error);
    return null;
  }
}
