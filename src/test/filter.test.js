import filter from '../filter.js';

describe('filter', () => {
  it('should return a new array with elements matching the predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    const predicate = ({ active }) => active;
    expect(filter(users, predicate)).to.deep.equal([{ user: 'barney', active: true }]);
  });

  it('should return an empty array if no elements match the predicate', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 5;
    expect(filter(array, predicate)).to.deep.equal([]);
  });

  it('should return an empty array when the input array is null or undefined', () => {
    const predicate = (value) => value !== undefined;
    expect(filter(null, predicate)).to.deep.equal([]);
    expect(filter(undefined, predicate)).to.deep.equal([]);
  });

  it('should throw an error if the predicate is not a function', () => {
    const array = [1, 2, 3];
    const invalidPredicate = 'not a function';
    expect(() => filter(array, invalidPredicate)).to.throw(TypeError);
  });

  it('should handle sparse arrays correctly', () => {
    const sparseArray = [1, , 3]; // Sparse array with an undefined hole
    const predicate = (value) => value !== undefined;
    expect(filter(sparseArray, predicate)).to.deep.equal([1, 3]);
  });

  it('should handle arrays with mixed data types', () => {
    const mixedArray = [1, '2', null, undefined, true, {}, []];
    const predicate = (value) => typeof value === 'number';
    expect(filter(mixedArray, predicate)).to.deep.equal([1]);
  });

  it('should pass the correct arguments to the predicate', () => {
    const spy = (value, index, array) => ({ value, index, array });
    const array = [1, 2, 3];
    const result = filter(array, spy);
    expect(result).to.deep.equal([
      { value: 1, index: 0, array },
      { value: 2, index: 1, array },
      { value: 3, index: 2, array },
    ]);
  });

  it('should handle an empty input array', () => {
    const predicate = (value) => value > 0;
    expect(filter([], predicate)).to.deep.equal([]);
  });

  it('should not modify the original array', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 1;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([2, 3]);
    expect(array).to.deep.equal([1, 2, 3]); // Original array remains unchanged
  });

  it('should handle predicates based on the element index', () => {
    const array = [10, 20, 30];
    const predicate = (value, index) => index % 2 === 0;
    expect(filter(array, predicate)).to.deep.equal([10, 30]);
  });

  it('should handle predicates based on the entire array', () => {
    const array = [1, 2, 3];
    const predicate = (value, index, arr) => arr.reduce((acc, curr) => acc + curr, 0) > 5;
    expect(filter(array, predicate)).to.deep.equal([1, 2, 3]);
  });
});
