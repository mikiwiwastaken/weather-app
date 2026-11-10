export function saveRecentSearches(searches) {
  try {
    localStorage.setItem("searches", JSON.stringify(searches));
  } catch (error) {
    console.error(error);
  }
}

export function loadRecentSearches() {
  try {
    const searches = JSON.parse(localStorage.getItem("searches"));
    return Array.isArray(searches) ? searches : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
