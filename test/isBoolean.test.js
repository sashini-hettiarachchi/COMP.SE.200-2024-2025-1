import { expect } from 'chai';
import isBoolean from '../src/isBoolean.js';

describe('isBoolean', function() {
  it('should return true for boolean primitive true', function() {
    expect(isBoolean(true)).to.be.true;
  });

  it('should return true for boolean primitive false', function() {
    expect(isBoolean(false)).to.be.true;
  });

  it('should return false for null', function() {
    expect(isBoolean(null)).to.be.false;
  });

  it('should return false for undefined', function() {
    expect(isBoolean(undefined)).to.be.false;
  });

  it('should return false for number', function() {
    expect(isBoolean(1)).to.be.false;
  });

  it('should return false for string', function() {
    expect(isBoolean('true')).to.be.false;
  });

  it('should return true for boolean object true', function() {
    expect(isBoolean(new Boolean(true))).to.be.true;
  });

  it('should return true for boolean object false', function() {
    expect(isBoolean(new Boolean(false))).to.be.true;
  });

  it('should return false for object', function() {
    expect(isBoolean({})).to.be.false;
  });

  it('should return false for array', function() {
    expect(isBoolean([])).to.be.false;
  });
});