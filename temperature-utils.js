export function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    return (value * 9) / 5 + 32;
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    return ((value - 32) * 5) / 9;
  }
}
