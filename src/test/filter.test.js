import filter from '../filter.js';

describe('filter function', () => {
  test('should return a new array with elements matching the predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    const predicate = ({ active }) => active;
    expect(filter(users, predicate)).toEqual([{ user: 'barney', active: true }]);
  });

  test('should return an empty array if no elements match the predicate', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 5;
    expect(filter(array, predicate)).toEqual([]);
  });

  test('should return an empty array when the input array is null or undefined', () => {
    const predicate = (value) => value !== undefined;
    expect(filter(null, predicate)).toEqual([]);
    expect(filter(undefined, predicate)).toEqual([]);
  });

  test('should throw an error if the predicate is not a function', () => {
    const array = [1, 2, 3];
    const invalidPredicate = 'not a function';
    expect(() => filter(array, invalidPredicate)).toThrow(TypeError);
  });

  test('should handle sparse arrays correctly', () => {
    const sparseArray = [1, , 3]; // Sparse array with an undefined hole
    const predicate = (value) => value !== undefined;
    expect(filter(sparseArray, predicate)).toEqual([1, 3]);
  });

  test('should handle arrays with mixed data types', () => {
    const mixedArray = [1, '2', null, undefined, true, {}, []];
    const predicate = (value) => typeof value === 'number';
    expect(filter(mixedArray, predicate)).toEqual([1]);
  });

  test('should handle an empty input array', () => {
    const predicate = (value) => value > 0;
    expect(filter([], predicate)).toEqual([]);
  });

  test('should not modify the original array', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 1;
    const result = filter(array, predicate);
    expect(result).toEqual([2, 3]);
    expect(array).toEqual([1, 2, 3]); // Original array remains unchanged
  });

  test('should handle predicates based on the element index', () => {
    const array = [10, 20, 30];
    const predicate = (value, index) => index % 2 === 0;
    expect(filter(array, predicate)).toEqual([10, 30]);
  });

  test('should handle predicates based on the entire array', () => {
    const array = [1, 2, 3];
    const predicate = (value, index, arr) => arr.reduce((acc, curr) => acc + curr, 0) > 5;
    expect(filter(array, predicate)).toEqual([1, 2, 3]);
  });
});
