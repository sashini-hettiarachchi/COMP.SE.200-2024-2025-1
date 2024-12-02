import eq from '../eq.js';

describe('eq', () => {
  // Basic equality checks
  it('should return true for two identical primitive values', () => {
    expect(eq(1, 1)).to.be.true;
    expect(eq('a', 'a')).to.be.true;
    expect(eq(true, true)).to.be.true;
  });

  it('should return false for two different primitive values', () => {
    expect(eq(1, 2)).to.be.false;
    expect(eq('a', 'b')).to.be.false;
    expect(eq(true, false)).to.be.false;
  });

  // Object and reference type checks
  it('should return true for the same object references', () => {
    const obj = { a: 1 };
    expect(eq(obj, obj)).to.be.true;
  });

  it('should return false for two objects with the same structure but different references', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(eq(obj1, obj2)).to.be.false;
  });

  it('should return false for a primitive and an object containing equivalent values', () => {
    expect(eq('a', Object('a'))).to.be.false;
    expect(eq(1, Object(1))).to.be.false;
  });

  // NaN handling
  it('should return true for NaN compared to NaN', () => {
    expect(eq(NaN, NaN)).to.be.true;
  });

  it('should return false for NaN compared to other values', () => {
    expect(eq(NaN, 1)).to.be.false;
    expect(eq(NaN, 'a')).to.be.false;
    expect(eq(NaN, undefined)).to.be.false;
    expect(eq(NaN, null)).to.be.false;
  });

  // Undefined and null handling
  it('should return true for undefined compared to undefined', () => {
    expect(eq(undefined, undefined)).to.be.true;
  });

  it('should return true for null compared to null', () => {
    expect(eq(null, null)).to.be.true;
  });

  it('should return false for undefined compared to null', () => {
    expect(eq(undefined, null)).to.be.false;
  });

  // Mixed types
  it('should return false for mixed types (e.g., number and string)', () => {
    expect(eq(1, '1')).to.be.false;
    expect(eq(true, 1)).to.be.false;
    expect(eq(false, 0)).to.be.false;
  });

  // Special cases
  it('should return true for symbolic values with the same reference', () => {
    const sym = Symbol('test');
    expect(eq(sym, sym)).to.be.true;
  });

  it('should return false for symbolic values with different references', () => {
    expect(eq(Symbol('test'), Symbol('test'))).to.be.false;
  });

  it('should handle arrays correctly', () => {
    const arr = [1, 2, 3];
    expect(eq(arr, arr)).to.be.true; // Same reference
    expect(eq([1, 2, 3], [1, 2, 3])).to.be.false; // Different references
  });

  it('should handle functions correctly', () => {
    const func = () => {};
    expect(eq(func, func)).to.be.true; // Same reference
    expect(eq(() => {}, () => {})).to.be.false; // Different references
  });

  // Edge cases
  it('should handle comparisons with 0 and -0 correctly', () => {
    expect(eq(0, -0)).to.be.true; // According to JavaScript, +0 === -0
  });

  it('should handle Infinity and -Infinity correctly', () => {
    expect(eq(Infinity, Infinity)).to.be.true;
    expect(eq(-Infinity, -Infinity)).to.be.true;
    expect(eq(Infinity, -Infinity)).to.be.false;
  });

  // Deep comparison (not applicable for this implementation)
  it('should not deeply compare nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 1 } };
    expect(eq(obj1, obj2)).to.be.false; // Different references
  });
});
