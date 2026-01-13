import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

function applyPrecision(value) {
  return Number(value.toFixed(defaults.precision));
}

// Valid units for each conversion type
const validUnits = {
  temperature: ["C", "F", "K"],
  distance: ["km", "mi", "m"],
  weight: ["g", "oz", "lb"]
};

function findTypeForUnit(unit) {
  for (const [type, units] of Object.entries(validUnits)) {
    if (units.includes(unit)) {
      return type;
    }
  }
  return null;
}

function validateNumber(value) {
  // Reject null and undefined early
  if (value === null || value === undefined) {
    throw new Error("Invalid numeric value");
  }
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) {
    throw new Error("Invalid numeric value");
  }
  return num;
}

export function convert(type, value, from, to) {
  // Validate numeric value
  const numValue = validateNumber(value);

  // Validate type
  if (!validUnits[type]) {
    throw new Error("Unknown type " + type);
  }

  // Validate units if provided
  if (from && !validUnits[type].includes(from)) {
    throw new Error(`Unknown unit "${from}" for ${type} conversion`);
  }
  if (to && !validUnits[type].includes(to)) {
    throw new Error(`Unknown unit "${to}" for ${type} conversion`);
  }

  switch (type) {
    case "temperature": {
      const raw = temperature.convertTemperature(
        numValue,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
      return applyPrecision(raw);
    }
    case "distance": {
      const raw = distance.convertDistance(numValue, from, to);
      return applyPrecision(raw);
    }
    case "weight": {
      const raw = weight.convertWeight(numValue, from, to);
      return applyPrecision(raw);
    }
  }
}

export function compare(valueA, unitA, valueB, unitB) {
  const numA = validateNumber(valueA);
  const numB = validateNumber(valueB);

  const typeA = findTypeForUnit(unitA);
  const typeB = findTypeForUnit(unitB);

  if (!typeA) {
    throw new Error(`Unknown unit "${unitA}"`);
  }
  if (!typeB) {
    throw new Error(`Unknown unit "${unitB}"`);
  }
  if (typeA !== typeB) {
    throw new Error("Cannot compare different measurement types");
  }

  const convertedAtoB = convert(typeA, numA, unitA, unitB);
  const convertedBtoA = convert(typeA, numB, unitB, unitA);

  return `${numA} ${unitA} = ${convertedAtoB} ${unitB}\n${numB} ${unitB} = ${convertedBtoA} ${unitA}`;
}
