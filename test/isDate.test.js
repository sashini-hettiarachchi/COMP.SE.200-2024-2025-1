import { expect } from 'chai';
import isDate from '../src/isDate.js';

describe('isDate', () => {
  it('should return true for valid Date objects', () => {
    expect(isDate(new Date())).to.be.true;
  });

  it('should return false for invalid Date objects', () => {
    expect(isDate(new Date('invalid date'))).to.be.false;
  });

  it('should return false for date-like strings', () => {
    expect(isDate('Mon April 23 2012')).to.be.false;
    expect(isDate('2023-01-01')).to.be.false;
    expect(isDate('')).to.be.false;
  });

  it('should return false for numbers', () => {
    expect(isDate(0)).to.be.false;
    expect(isDate(Date.now())).to.be.false; // Milliseconds since epoch
  });

  it('should return false for null and undefined', () => {
    expect(isDate(null)).to.be.false;
    expect(isDate(undefined)).to.be.false;
  });

  it('should return false for non-Date objects', () => {
    expect(isDate({})).to.be.false; // Plain object
    expect(isDate([])).to.be.false; // Array
    expect(isDate({ toString: () => '[object Date]' })).to.be.false; // Mimic Date
  });

  it('should return false for functions', () => {
    expect(isDate(() => new Date())).to.be.false;
    expect(isDate(function() { return new Date(); })).to.be.false;
  });

  it('should return true for custom objects inheriting from Date', () => {
    class CustomDate extends Date {}
    expect(isDate(new CustomDate())).to.be.true;
  });
});
