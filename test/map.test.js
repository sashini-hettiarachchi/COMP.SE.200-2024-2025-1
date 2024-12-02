import { expect } from 'chai';
import map from '../src/map.js';

describe('map', () => {
  it('should apply the iteratee to each element in the array', () => {
    const square = (n) => n * n;
    expect(map([4, 8], square)).to.deep.equal([16, 64]);
  });

  it('should return an empty array if the input array is empty', () => {
    const iteratee = (n) => n * n;
    expect(map([], iteratee)).to.deep.equal([]);
  });

  it('should handle null or undefined as the input array', () => {
    const iteratee = (n) => n * n;
    expect(map(null, iteratee)).to.deep.equal([]);
    expect(map(undefined, iteratee)).to.deep.equal([]);
  });

  it('should throw an error if iteratee is not a function', () => {
    const invalidIteratee = 'not a function';
    expect(() => map([1, 2, 3], invalidIteratee)).to.throw(TypeError);
  });

  it('should pass the correct arguments to the iteratee', () => {
    const spy = (value, index, array) => ({ value, index, array });
    const array = [1, 2, 3];
    const result = map(array, spy);
    expect(result).to.deep.equal([
      { value: 1, index: 0, array },
      { value: 2, index: 1, array },
      { value: 3, index: 2, array },
    ]);
  });

  it('should handle sparse arrays correctly', () => {
    const sparseArray = [1, , 3]; // Sparse array with an undefined hole
    const iteratee = (n) => (n === undefined ? 'missing' : n * 2);
    expect(map(sparseArray, iteratee)).to.deep.equal([2, 'missing', 6]);
  });

  it('should handle arrays with different types of elements', () => {
    const mixedArray = [1, '2', null, undefined, true];
    const iteratee = (value) => typeof value;
    expect(map(mixedArray, iteratee)).to.deep.equal(['number', 'string', 'object', 'undefined', 'boolean']);
  });

  it('should return a new array without modifying the original array', () => {
    const array = [1, 2, 3];
    const iteratee = (n) => n + 1;
    const result = map(array, iteratee);
    expect(result).to.deep.equal([2, 3, 4]);
    expect(array).to.deep.equal([1, 2, 3]); // Original array remains unchanged
  });

  it('should handle iteratees that depend on the index', () => {
    const iteratee = (value, index) => value + index;
    expect(map([10, 20, 30], iteratee)).to.deep.equal([10, 21, 32]);
  });

  it('should handle iteratees that depend on the entire array', () => {
    const iteratee = (value, index, array) => array.reduce((acc, curr) => acc + curr, 0) + value;
    expect(map([1, 2, 3], iteratee)).to.deep.equal([7, 8, 9]);
  });

  it('should work with a custom object implementing the array-like interface', () => {
    const arrayLikeObject = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const iteratee = (value) => value.toUpperCase();
    expect(map(Array.from(arrayLikeObject), iteratee)).to.deep.equal(['A', 'B', 'C']);
  });

  it('should handle nested arrays', () => {
    const nestedArray = [[1, 2], [3, 4]];
    const iteratee = (subArray) => subArray.map((n) => n * 2);
    expect(map(nestedArray, iteratee)).to.deep.equal([[2, 4], [6, 8]]);
  });
});