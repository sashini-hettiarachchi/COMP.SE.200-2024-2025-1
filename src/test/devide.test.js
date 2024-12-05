import divide from '../divide.js';

describe('divide function', () => {
  // Basic functionality tests
  test('should return the correct quotient for two positive numbers', () => {
    expect(divide(6, 3)).toBe(2);
  });

  test('should handle division with negative numbers', () => {
    expect(divide(-6, 3)).toBe(-2);
    expect(divide(6, -3)).toBe(-2);
    expect(divide(-6, -3)).toBe(2);
  });

  test('should return 0 when the dividend is 0', () => {
    expect(divide(0, 3)).toBe(0);
  });

  // Edge cases
  test('should handle division by 0 gracefully', () => {
    expect(divide(6, 0)).toBe(Infinity); // As per JavaScript behavior
    expect(divide(-6, 0)).toBe(-Infinity);
    expect(divide(0, 0)).toBeNaN(); // 0 divided by 0 results in NaN
  });

  test('should handle very large numbers', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    expect(divide(largeNumber, 2)).toBe(largeNumber / 2);
  });

  test('should handle very small numbers (including fractions)', () => {
    expect(divide(0.1, 0.2)).toBeCloseTo(0.5, 4); // Floating-point precision
  });

  // Fallback default tests
  test('should return the fallback value when arguments are missing', () => {
    expect(divide(undefined, undefined)).toBe(1); // Default fallback
    expect(divide(6)).toBe(1); // Missing divisor
    expect(divide(undefined, 3)).toBe(1); // Missing dividend
  });

  // Invalid input handling
  test('should return NaN for non-numeric inputs', () => {
    expect(divide('a', 3)).toBeNaN();
    expect(divide(6, 'b')).toBeNaN();
    expect(divide('a', 'b')).toBeNaN();
  });

  // Mixed types
  test('should handle inputs with mixed types', () => {
    expect(divide('6', 3)).toBe(2); // String numbers should be coerced to numbers
    expect(divide(6, '3')).toBe(2);
    expect(divide('6', '3')).toBe(2);
  });

  // Immutability
  test('should not mutate input values', () => {
    const dividend = 6;
    const divisor = 3;
    divide(dividend, divisor);
    expect(dividend).toBe(6);
    expect(divisor).toBe(3);
  });

  // Complex numbers and unexpected inputs
  test('should return NaN for unsupported data structures', () => {
    expect(divide([6], 3)).toBeNaN();
    expect(divide(6, { value: 3 })).toBeNaN();
    expect(divide(null, 3)).toBeNaN();
    expect(divide(6, null)).toBeNaN();
  });
});
