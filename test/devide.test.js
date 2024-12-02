


import { expect } from 'chai';
import divide from '../src/divide.js';

describe('divide', () => {
  // Basic functionality tests
  it('should return the correct quotient for two positive numbers', () => {
    expect(divide(6, 3)).to.equal(2);
  });

  it('should handle division with negative numbers', () => {
    expect(divide(-6, 3)).to.equal(-2);
    expect(divide(6, -3)).to.equal(-2);
    expect(divide(-6, -3)).to.equal(2);
  });

  it('should return 0 when the dividend is 0', () => {
    expect(divide(0, 3)).to.equal(0);
  });

  // Edge cases
  it('should handle division by 0 gracefully', () => {
    expect(divide(6, 0)).to.equal(Infinity); // As per JavaScript behavior
    expect(divide(-6, 0)).to.equal(-Infinity);
    expect(divide(0, 0)).to.be.NaN; // 0 divided by 0 results in NaN
  });

  it('should handle very large numbers', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    expect(divide(largeNumber, 2)).to.equal(largeNumber / 2);
  });

  it('should handle very small numbers (including fractions)', () => {
    expect(divide(0.1, 0.2)).to.be.closeTo(0.5, 0.0001); // Floating-point precision
  });

  // Fallback default tests
  it('should return the fallback value when arguments are missing', () => {
    expect(divide(undefined, undefined)).to.equal(1); // Default fallback
    expect(divide(6)).to.equal(1); // Missing divisor
    expect(divide(undefined, 3)).to.equal(1); // Missing dividend
  });

  // Invalid input handling
  it('should return NaN for non-numeric inputs', () => {
    expect(divide('a', 3)).to.be.NaN;
    expect(divide(6, 'b')).to.be.NaN;
    expect(divide('a', 'b')).to.be.NaN;
  });

  // Mixed types
  it('should handle inputs with mixed types', () => {
    expect(divide('6', 3)).to.equal(2); // String numbers should be coerced to numbers
    expect(divide(6, '3')).to.equal(2);
    expect(divide('6', '3')).to.equal(2);
  });

  // Immutability
  it('should not mutate input values', () => {
    const dividend = 6;
    const divisor = 3;
    divide(dividend, divisor);
    expect(dividend).to.equal(6);
    expect(divisor).to.equal(3);
  });

  // Complex numbers and unexpected inputs
  it('should return NaN for unsupported data structures', () => {
    expect(divide([6], 3)).to.be.NaN;
    expect(divide(6, { value: 3 })).to.be.NaN;
    expect(divide(null, 3)).to.be.NaN;
    expect(divide(6, null)).to.be.NaN;
  });
});

