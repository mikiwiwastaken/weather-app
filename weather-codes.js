const weatherDataMap = {
  0: { description: "Clear sky", icon: "fa-solid fa-sun" },
  1: { description: "Mainly clear", icon: "fa-solid fa-cloud-sun" },
  2: { description: "Partly cloudy", icon: "fa-solid fa-cloud-sun" },
  3: { description: "Overcast", icon: "fa-solid fa-cloud" },
  45: { description: "Fog", icon: "fa-solid fa-smog" },
  48: { description: "Depositing rime fog", icon: "fa-solid fa-smog" },
  51: { description: "Slight drizzle", icon: "fa-solid fa-cloud-rain" },
  53: { description: "Moderate drizzle", icon: "fa-solid fa-cloud-rain" },
  55: { description: "Dense drizzle", icon: "fa-solid fa-cloud-rain" },
  56: { description: "Light freezing drizzle", icon: "fa-solid fa-cloud-rain" },
  57: { description: "Dense freezing drizzle", icon: "fa-solid fa-cloud-rain" },
  61: { description: "Slight rain", icon: "fa-solid fa-cloud-showers-heavy" },
  63: { description: "Moderate rain", icon: "fa-solid fa-cloud-showers-heavy" },
  65: { description: "Heavy rain", icon: "fa-solid fa-cloud-showers-heavy" },
  66: {
    description: "Light freezing rain",
    icon: "fa-solid fa-cloud-showers-heavy",
  },
  67: {
    description: "Heavy freezing rain",
    icon: "fa-solid fa-cloud-showers-heavy",
  },
  71: { description: "Slight snow fall", icon: "fa-solid fa-snowflake" },
  73: { description: "Moderate snow fall", icon: "fa-solid fa-snowflake" },
  75: { description: "Heavy snow fall", icon: "fa-solid fa-snowflake" },
  77: { description: "Snow grains", icon: "fa-solid fa-snowflake" },
  80: {
    description: "Slight rain showers",
    icon: "fa-solid fa-cloud-showers-heavy",
  },
  81: {
    description: "Moderate rain showers",
    icon: "fa-solid fa-cloud-showers-heavy",
  },
  82: {
    description: "Violent rain showers",
    icon: "fa-solid fa-cloud-showers-heavy",
  },
  85: {
    description: "Slight snow showers",
    icon: "fa-solid fa-snowflake",
  },
  86: {
    description: "Heavy snow showers",
    icon: "fa-solid fa-snowflake",
  },
  95: { description: "Thunderstorm", icon: "fa-solid fa-cloud-bolt" },
  96: {
    description: "Thunderstorm with slight hail",
    icon: "fa-solid fa-cloud-bolt",
  },
  99: {
    description: "Thunderstorm with heavy hail",
    icon: "fa-solid fa-cloud-bolt",
  },
};

export function getWeatherDetails(code) {
  return (
    weatherDataMap[code] || {
      description: "Unknown",
      icon: "fa-solid fa-question",
    }
  );
}
