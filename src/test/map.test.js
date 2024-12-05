import map from '../map.js';

describe('map', () => {
  test('should apply the iteratee to each element in the array', () => {
    const square = (n) => n * n;
    expect(map([4, 8], square)).toEqual([16, 64]);
  });

  test('should return an empty array if the input array is empty', () => {
    const iteratee = (n) => n * n;
    expect(map([], iteratee)).toEqual([]);
  });

  test('should handle null or undefined as the input array', () => {
    const iteratee = (n) => n * n;
    expect(map(null, iteratee)).toEqual([]);
    expect(map(undefined, iteratee)).toEqual([]);
  });

  test('should throw an error if iteratee is not a function', () => {
    const invalidIteratee = 'not a function';
    expect(() => map([1, 2, 3], invalidIteratee)).toThrow(TypeError);
  });

  test('should pass the correct arguments to the iteratee', () => {
    const spy = jest.fn((value, index, array) => ({ value, index, array }));
    const array = [1, 2, 3];
    const result = map(array, spy);
    expect(result).toEqual([
      { value: 1, index: 0, array },
      { value: 2, index: 1, array },
      { value: 3, index: 2, array },
    ]);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('should handle sparse arrays correctly', () => {
    const sparseArray = [1, , 3]; // Sparse array with an undefined hole
    const iteratee = (n) => (n === undefined ? 'missing' : n * 2);
    expect(map(sparseArray, iteratee)).toEqual([2, 'missing', 6]);
  });

  test('should handle arrays with different types of elements', () => {
    const mixedArray = [1, '2', null, undefined, true];
    const iteratee = (value) => typeof value;
    expect(map(mixedArray, iteratee)).toEqual(['number', 'string', 'object', 'undefined', 'boolean']);
  });

  test('should return a new array without modifying the original array', () => {
    const array = [1, 2, 3];
    const iteratee = (n) => n + 1;
    const result = map(array, iteratee);
    expect(result).toEqual([2, 3, 4]);
    expect(array).toEqual([1, 2, 3]); // Original array remains unchanged
  });

  test('should handle iteratees that depend on the index', () => {
    const iteratee = (value, index) => value + index;
    expect(map([10, 20, 30], iteratee)).toEqual([10, 21, 32]);
  });

  test('should handle iteratees that depend on the entire array', () => {
    const iteratee = (value, index, array) => array.reduce((acc, curr) => acc + curr, 0) + value;
    expect(map([1, 2, 3], iteratee)).toEqual([7, 8, 9]);
  });

  test('should work with a custom object implementing the array-like interface', () => {
    const arrayLikeObject = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const iteratee = (value) => value.toUpperCase();
    expect(map(Array.from(arrayLikeObject), iteratee)).toEqual(['A', 'B', 'C']);
  });

  test('should handle nested arrays', () => {
    const nestedArray = [[1, 2], [3, 4]];
    const iteratee = (subArray) => subArray.map((n) => n * 2);
    expect(map(nestedArray, iteratee)).toEqual([[2, 4], [6, 8]]);
  });
});
