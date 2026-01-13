import { test } from "node:test";
import { strictEqual, ok } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts kilometers to miles", () => {
  strictEqual(convertDistance(1, "km", "mi"), 0.621371);
});

test("converts miles to kilometers", () => {
  // Use tolerance for floating-point precision
  ok(Math.abs(convertDistance(1, "mi", "km") - (1 / 0.621371)) < 1e-10);
});

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(5.5, "km", "m"), 5500);
});

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(2500, "m", "km"), 2.5);
});

test("converts miles to meters", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1609.34);
});

test("converts meters to miles", () => {
  strictEqual(convertDistance(1609.34, "m", "mi"), 1);
});
