
import add  from '../src/add.js'; 
import { expect } from 'chai';

describe('add function', () => {
  it('should return the sum of two positive numbers', () => {
    expect(add(2, 3)).to.equal(5);
  });

  it('should return the sum of a positive and a negative number', () => {
    expect(add(2, -3)).to.equal(-1);
  });

  it('should return the sum of two negative numbers', () => {
    expect(add(-2, -3)).to.equal(-5);
  });

  it('should return the same number when adding zero', () => {
    expect(add(5, 0)).to.equal(5);
    expect(add(0, 5)).to.equal(5);
  });

  it('should handle adding floating point numbers', () => {
    expect(add(2.5, 3.5)).to.equal(6);
  });
});
