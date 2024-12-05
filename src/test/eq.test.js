import eq from '../eq.js';

describe('eq', () => {
  // Basic equality checks
  test('should return true for two identical primitive values', () => {
    expect(eq(1, 1)).toBe(true);
    expect(eq('a', 'a')).toBe(true);
    expect(eq(true, true)).toBe(true);
  });

  test('should return false for two different primitive values', () => {
    expect(eq(1, 2)).toBe(false);
    expect(eq('a', 'b')).toBe(false);
    expect(eq(true, false)).toBe(false);
  });

  // Object and reference type checks
  test('should return true for the same object references', () => {
    const obj = { a: 1 };
    expect(eq(obj, obj)).toBe(true);
  });

  test('should return false for two objects with the same structure but different references', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(eq(obj1, obj2)).toBe(false);
  });

  test('should return false for a primitive and an object containing equivalent values', () => {
    expect(eq('a', Object('a'))).toBe(false);
    expect(eq(1, Object(1))).toBe(false);
  });

  // NaN handling
  test('should return true for NaN compared to NaN', () => {
    expect(eq(NaN, NaN)).toBe(true);
  });

  test('should return false for NaN compared to other values', () => {
    expect(eq(NaN, 1)).toBe(false);
    expect(eq(NaN, 'a')).toBe(false);
    expect(eq(NaN, undefined)).toBe(false);
    expect(eq(NaN, null)).toBe(false);
  });

  // Undefined and null handling
  test('should return true for undefined compared to undefined', () => {
    expect(eq(undefined, undefined)).toBe(true);
  });

  test('should return true for null compared to null', () => {
    expect(eq(null, null)).toBe(true);
  });

  test('should return false for undefined compared to null', () => {
    expect(eq(undefined, null)).toBe(false);
  });

  // Mixed types
  test('should return false for mixed types (e.g., number and string)', () => {
    expect(eq(1, '1')).toBe(false);
    expect(eq(true, 1)).toBe(false);
    expect(eq(false, 0)).toBe(false);
  });

  // Special cases
  test('should return true for symbolic values with the same reference', () => {
    const sym = Symbol('test');
    expect(eq(sym, sym)).toBe(true);
  });

  test('should return false for symbolic values with different references', () => {
    expect(eq(Symbol('test'), Symbol('test'))).toBe(false);
  });

  test('should handle arrays correctly', () => {
    const arr = [1, 2, 3];
    expect(eq(arr, arr)).toBe(true); // Same reference
    expect(eq([1, 2, 3], [1, 2, 3])).toBe(false); // Different references
  });

  test('should handle functions correctly', () => {
    const func = () => {};
    expect(eq(func, func)).toBe(true); // Same reference
    expect(eq(() => {}, () => {})).toBe(false); // Different references
  });

  // Edge cases
  test('should handle comparisons with 0 and -0 correctly', () => {
    expect(eq(0, -0)).toBe(true); // According to JavaScript, +0 === -0
  });

  test('should handle Infinity and -Infinity correctly', () => {
    expect(eq(Infinity, Infinity)).toBe(true);
    expect(eq(-Infinity, -Infinity)).toBe(true);
    expect(eq(Infinity, -Infinity)).toBe(false);
  });

  // Deep comparison (not applicable for this implementation)
  test('should not deeply compare nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 1 } };
    expect(eq(obj1, obj2)).toBe(false); // Different references
  });
});
    