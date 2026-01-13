#!/usr/bin/env node
import { compare, convert } from "../src/convert.js";

const [, , command, ...rest] = process.argv;

const printUsage = () => {
  console.error("Usage:");
  console.error("  convert <type> <value> [from] [to]");
  console.error(
    "  convert compare <value1> <unit1> <value2> <unit2>"
  );
};

if (!command) {
  printUsage();
  process.exit(1);
}

if (command === "compare") {
  const [valueA, unitA, valueB, unitB] = rest;
  if (!valueA || !unitA || !valueB || !unitB) {
    printUsage();
    process.exit(1);
  }
  console.log(compare(valueA, unitA, valueB, unitB));
} else {
  const [value, from, to] = rest;
  if (!value) {
    printUsage();
    process.exit(1);
  }

  const result = convert(command, value, from, to);
  console.log(result);
}
