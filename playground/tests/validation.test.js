import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { convert } from "../src/convert.js";

// Tests for input validation
// These tests should FAIL initially and pass after implementing validation

test("rejects non-numeric value", () => {
  throws(
    () => convert("temperature", "abc", "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for non-numeric input"
  );
});

test("rejects NaN value", () => {
  throws(
    () => convert("temperature", NaN, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for NaN"
  );
});

test("rejects unknown conversion type", () => {
  throws(
    () => convert("volume", 100, "L", "gal"),
    /unknown.*type/i,
    "Should throw error for unsupported conversion type"
  );
});

test("accepts valid numeric strings", () => {
  // Should convert string to number and process
  const result = convert("temperature", "100", "C", "F");
  strictEqual(result, 212);
});

test("accepts negative values", () => {
  const result = convert("temperature", -40, "C", "F");
  strictEqual(result, -40); // -40°C = -40°F (special case!)
});

test("accepts zero", () => {
  const result = convert("temperature", 0, "C", "F");
  strictEqual(result, 32);
});

test("rejects unknown unit in 'from' parameter", () => {
  throws(
    () => convert("temperature", 100, "X", "F"),
    /unknown.*unit|unsupported/i,
    "Should throw error for unknown 'from' unit"
  );
});

test("rejects unknown unit in 'to' parameter", () => {
  throws(
    () => convert("temperature", 100, "C", "X"),
    /unknown.*unit|unsupported/i,
    "Should throw error for unknown 'to' unit"
  );
});

test("accepts valid units for distance conversion", () => {
  // Should not throw - these are now valid units
  strictEqual(convert("distance", 100, "m", "km"), 0.1);
  strictEqual(convert("distance", 1, "km", "m"), 1000);
});

test("accepts valid units for weight conversion", () => {
  // Should not throw - these are now valid units
  strictEqual(convert("weight", 1, "lb", "g"), 453.59);
  strictEqual(convert("weight", 16, "oz", "lb"), 1);
});

test("accepts Kelvin for temperature conversion", () => {
  strictEqual(convert("temperature", 0, "C", "K"), 273.15);
  strictEqual(convert("temperature", 273.15, "K", "C"), 0);
});

test("accepts Infinity as numeric value", () => {
  throws(
    () => convert("temperature", Infinity, "C", "F"),
    /invalid.*number|numeric/i,
    "Should reject Infinity"
  );
});

test("rejects null value", () => {
  throws(
    () => convert("temperature", null, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for null"
  );
});

test("rejects undefined value", () => {
  throws(
    () => convert("temperature", undefined, "C", "F"),
    /invalid.*number|numeric/i,
    "Should throw error for undefined"
  );
});
