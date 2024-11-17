import { expect } from 'chai';
import isDate from '../src/isDate.js';

describe('isDate', () => {
  it('should return true for a valid Date object', () => {
    expect(isDate(new Date())).to.be.true;
  });

  it('should return false for a string that looks like a date', () => {
    expect(isDate('Mon April 23 2012')).to.be.false;
  });

  it('should return false for a number', () => {
    expect(isDate(1234567890)).to.be.false;
  });

  it('should return false for an object', () => {
    expect(isDate({})).to.be.false;
  });

  it('should return false for null', () => {
    expect(isDate(null)).to.be.false;
  });

  it('should return false for undefined', () => {
    expect(isDate(undefined)).to.be.false;
  });
});