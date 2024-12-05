import isBoolean from '../isBoolean.js';

describe('isBoolean', () => {
  test('should return true for boolean primitives (true)', () => {
    expect(isBoolean(true)).toBe(true);
  });

  test('should return true for boolean primitives (false)', () => {
    expect(isBoolean(false)).toBe(true);
  });

  test('should return false for non-boolean primitives (number)', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(-1)).toBe(false);
  });

  test('should return false for non-boolean primitives (string)', () => {
    expect(isBoolean('')).toBe(false);
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean('false')).toBe(false);
  });

  test('should return false for non-boolean primitives (null)', () => {
    expect(isBoolean(null)).toBe(false);
  });

  test('should return false for non-boolean primitives (undefined)', () => {
    expect(isBoolean(undefined)).toBe(false);
  });

  test('should return false for non-boolean primitives (symbol)', () => {
    expect(isBoolean(Symbol())).toBe(false);
  });

  test('should return false for non-boolean primitives (bigint)', () => {
    expect(isBoolean(BigInt(0))).toBe(false);
  });

  test('should return false for objects that are not boolean objects', () => {
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(/regex/)).toBe(false);
  });

  test('should return true for Boolean objects', () => {
    expect(isBoolean(new Boolean(true))).toBe(true);
    expect(isBoolean(new Boolean(false))).toBe(true);
  });

  test('should return false for objects with boolean-like values', () => {
    expect(isBoolean({ value: true })).toBe(false);
    expect(isBoolean({ value: false })).toBe(false);
  });

  test('should return false for functions', () => {
    expect(isBoolean(() => true)).toBe(false);
    expect(isBoolean(function () { return false; })).toBe(false);
  });

  test('should handle edge cases like NaN', () => {
    expect(isBoolean(NaN)).toBe(false);
  });

  test('should handle nested objects with boolean values', () => {
    expect(isBoolean({ nested: { value: true } })).toBe(false);
  });
});
