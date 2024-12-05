import add from '../add.js';

describe('add function', () => {
  test('should return the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5); // Use Jest's toBe for primitive values
  });

  test('should return the sum of a positive and a negative number', () => {
    expect(add(2, -3)).toBe(-1);
  });

  test('should return the sum of two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('should return the same number when adding zero', () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
  });

  test('should handle adding floating point numbers', () => {
    expect(add(2.5, 3.5)).toBe(6);
    expect(add(1.1, 2.2)).toBeCloseTo(3.3); // Use toBeCloseTo for floating point precision
  });

  test('should return NaN when one input is NaN', () => {
    expect(add(NaN, 5)).toBeNaN(); // Use Jest's toBeNaN
    expect(add(5, NaN)).toBeNaN();
  });

  test('should return NaN when one input is undefined', () => {
    expect(add(undefined, 5)).toBeNaN();
    expect(add(5, undefined)).toBeNaN();
  });

  test('should return NaN when one input is null', () => {
    expect(add(null, 5)).toBeNaN();
    expect(add(5, null)).toBeNaN();
  });

  test('should coerce string inputs into numbers', () => {
    expect(add('5', 5)).toBe(10);
    expect(add('5.5', 0.5)).toBe(6);
  });

  test('should handle very small numbers', () => {
    expect(add(1e-10, 1e-10)).toBe(2e-10);
  });

  test('should handle very large numbers', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    expect(add(largeNumber, 1)).toBe(largeNumber + 1);
  });

  test('should handle adding a large negative number', () => {
    const negativeLargeNumber = -Number.MAX_SAFE_INTEGER;
    expect(add(negativeLargeNumber, -1)).toBe(negativeLargeNumber - 1);
  });

  test('should return the same negative number when adding zero', () => {
    expect(add(-5, 0)).toBe(-5);
    expect(add(0, -5)).toBe(-5);
  });
});
