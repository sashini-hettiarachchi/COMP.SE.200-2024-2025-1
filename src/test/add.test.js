import add from '../add.js';

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
    expect(add(1.1, 2.2)).to.equal(3.3);
  });

  it('should return NaN when one input is NaN', () => {
    expect(add(NaN, 5)).to.be.NaN;
    expect(add(5, NaN)).to.be.NaN;
  });

  it('should return NaN when one input is undefined', () => {
    expect(add(undefined, 5)).to.be.NaN;
    expect(add(5, undefined)).to.be.NaN;
  });

  it('should return NaN when one input is null', () => {
    expect(add(null, 5)).to.be.NaN;
    expect(add(5, null)).to.be.NaN;
  });

  it('should coerce string inputs into numbers', () => {
    expect(add('5', 5)).to.equal(10); 
    expect(add('5.5', 0.5)).to.equal(6);
  });

  it('should handle very small numbers', () => {
    expect(add(1e-10, 1e-10)).to.equal(2e-10);
  });

  it('should handle very large numbers', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    expect(add(largeNumber, 1)).to.equal(largeNumber + 1);
  });

  it('should handle adding a large negative number', () => {
    const negativeLargeNumber = -Number.MAX_SAFE_INTEGER;
    expect(add(negativeLargeNumber, -1)).to.equal(negativeLargeNumber - 1);
  });

  it('should return the same negative number when adding zero', () => {
    expect(add(-5, 0)).to.equal(-5);
    expect(add(0, -5)).to.equal(-5);
  });
});
