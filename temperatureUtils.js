export function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return;

  if (fromUnit === "C" && toUnit === "F") {
    return (value * 9) / 5 + 32;
  } else if (fromUnit === "F" && toUnit === "C") {
    return ((value - 32) * 5) / 9;
  }
}
