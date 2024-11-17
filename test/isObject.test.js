import { expect } from 'chai';
import isObject from '../src/isObject.js';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).to.be.true;
    expect(isObject([1, 2, 3])).to.be.true;
    expect(isObject(function() {})).to.be.true;
    expect(isObject(new Number(0))).to.be.true;
    expect(isObject(new String(''))).to.be.true;
  });

  it('should return false for non-objects', () => {
    expect(isObject(null)).to.be.false;
    expect(isObject(undefined)).to.be.false;
    expect(isObject(42)).to.be.false;
    expect(isObject('string')).to.be.false;
    expect(isObject(true)).to.be.false;
  });
});