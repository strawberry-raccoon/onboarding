export function convertTemperature(value, from, to) {
  if (from === "C" && to === "F") {
    return value * (9 / 5) + 32;
  }
  if (from === "F" && to === "C") {
    return (value - 32) * (5 / 9);
  }
  // Celsius to Kelvin
  if (from === "C" && to === "K") {
    return value + 273.15;
  }
  // Kelvin to Celsius
  if (from === "K" && to === "C") {
    return value - 273.15;
  }
  // Fahrenheit to Kelvin
  if (from === "F" && to === "K") {
    return (value - 32) * (5 / 9) + 273.15;
  }
  // Kelvin to Fahrenheit
  if (from === "K" && to === "F") {
    return (value - 273.15) * (9 / 5) + 32;
  }
  throw new Error(`Unsupported temperature conversion: ${from} to ${to}`);
}
