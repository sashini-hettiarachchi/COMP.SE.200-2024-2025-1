import { expect } from 'chai';
import isBoolean from '../src/isBoolean.js';

describe('isBoolean', () => {
  it('should return true for boolean primitives (true)', () => {
    expect(isBoolean(true)).to.be.true;
  });

  it('should return true for boolean primitives (false)', () => {
    expect(isBoolean(false)).to.be.true;
  });

  it('should return false for non-boolean primitives (number)', () => {
    expect(isBoolean(0)).to.be.false;
    expect(isBoolean(1)).to.be.false;
    expect(isBoolean(-1)).to.be.false;
  });

  it('should return false for non-boolean primitives (string)', () => {
    expect(isBoolean('')).to.be.false;
    expect(isBoolean('true')).to.be.false;
    expect(isBoolean('false')).to.be.false;
  });

  it('should return false for non-boolean primitives (null)', () => {
    expect(isBoolean(null)).to.be.false;
  });

  it('should return false for non-boolean primitives (undefined)', () => {
    expect(isBoolean(undefined)).to.be.false;
  });

  it('should return false for non-boolean primitives (symbol)', () => {
    expect(isBoolean(Symbol())).to.be.false;
  });

  it('should return false for non-boolean primitives (bigint)', () => {
    expect(isBoolean(BigInt(0))).to.be.false;
  });

  it('should return false for objects that are not boolean objects', () => {
    expect(isBoolean({})).to.be.false;
    expect(isBoolean([])).to.be.false;
    expect(isBoolean(new Date())).to.be.false;
    expect(isBoolean(/regex/)).to.be.false;
  });

  it('should return true for Boolean objects', () => {
    expect(isBoolean(new Boolean(true))).to.be.true;
    expect(isBoolean(new Boolean(false))).to.be.true;
  });

  it('should return false for objects with boolean-like values', () => {
    expect(isBoolean({ value: true })).to.be.false;
    expect(isBoolean({ value: false })).to.be.false;
  });

  it('should return false for functions', () => {
    expect(isBoolean(() => true)).to.be.false;
    expect(isBoolean(function() { return false; })).to.be.false;
  });

  it('should handle edge cases like NaN', () => {
    expect(isBoolean(NaN)).to.be.false;
  });

  it('should handle nested objects with boolean values', () => {
    expect(isBoolean({ nested: { value: true } })).to.be.false;
  });
});
