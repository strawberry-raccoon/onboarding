import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { compare } from "../src/convert.js";

test("compare converts both values to each other's units", () => {
  const expected = "5 km = 3.11 mi\n3 mi = 4.83 km";
  strictEqual(compare(5, "km", 3, "mi"), expected);
});

test("compare rejects values with different measurement types", () => {
  throws(
    () => compare(1, "km", 1, "C"),
    /different.*measurement/i,
    "Should reject comparisons across measurement types"
  );
});

test("compare rejects unknown units", () => {
  throws(
    () => compare(1, "km", 1, "yard"),
    /unknown.*unit/i,
    "Should throw for unrecognized units"
  );
});

