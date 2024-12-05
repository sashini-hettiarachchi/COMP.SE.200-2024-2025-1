import get from '../get.js';

describe('get function', () => {
  // 1. Basic Existence of Property
  test('should return the value when the property exists at the given path (string format)', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 'a.b.c');
    expect(result).toBe(3); 
  });

  test('should return the value when the property exists at the given path (array format)', () => {
    const object = { a: [{ b: { c: 3 } }] };
    const result = get(object, ['a', '0', 'b', 'c']);
    expect(result).toBe(3);
  });

  // 2. Property Does Not Exist (with Default Value)
  test('should return the default value when the property does not exist (string format)', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 'a.b.d', 'default');
    expect(result).toBe('default');
  });

  test('should return the default value when the property does not exist (array format)', () => {
    const object = { a: [{ b: { c: 3 } }] };
    const result = get(object, ['a', '0', 'b', 'd'], 'default');
    expect(result).toBe('default');
  });

  // 3. Edge Case: Null or Undefined Object
  test('should return undefined if the object is null', () => {
    const result = get(null, 'a.b.c');
    expect(result).toBeUndefined();
  });

  test('should return undefined if the object is undefined', () => {
    const result = get(undefined, 'a.b.c');
    expect(result).toBeUndefined();
  });

  test('should return the default value if the object is null or undefined', () => {
    const result = get(null, 'a.b.c', 'default');
    expect(result).toBe('default');

    const result2 = get(undefined, 'a.b.c', 'default');
    expect(result2).toBe('default');
  });

  // 4. Deeply Nested Path
  test('should return the correct value for deeply nested path (string format)', () => {
    const object = { a: { b: { c: { d: { e: 5 } } } } };
    const result = get(object, 'a.b.c.d.e');
    expect(result).toBe(5);
  });

  test('should return the correct value for deeply nested path (array format)', () => {
    const object = { a: [{ b: { c: { d: { e: 5 } } } }] };
    const result = get(object, ['a', '0', 'b', 'c', 'd', 'e']);
    expect(result).toBe(5);
  });

  // 5. Using Non-Existent Default Value
  test('should return the default value when the value at the path is undefined (string format)', () => {
    const object = { a: { b: undefined } };
    const result = get(object, 'a.b', 'default');
    expect(result).toBe('default');
  });

  test('should return the default value when the value at the path is undefined (array format)', () => {
    const object = { a: [{ b: undefined }] };
    const result = get(object, ['a', '0', 'b'], 'default');
    expect(result).toBe('default');
  });

  // 6. Invalid Path Types
  test('should return undefined when an invalid path type (non-string or array) is passed', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 123); // Invalid path type
    expect(result).toBeUndefined();
  });

  test('should return the default value when an invalid path type (non-string or array) is passed', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 123, 'default'); // Invalid path type
    expect(result).toBe('default');
  });

  // 7. Edge Case: Empty Object
  test('should return undefined if the object is empty', () => {
    const object = {};
    const result = get(object, 'a.b.c');
    expect(result).toBeUndefined();
  });

  test('should return the default value if the object is empty and default is passed', () => {
    const object = {};
    const result = get(object, 'a.b.c', 'default');
    expect(result).toBe('default');
  });

  // 8. Arrays as Objects
  test('should return correct value for array index', () => {
    const object = { a: [10, 20, 30] };
    const result = get(object, 'a[1]');
    expect(result).toBe(20);
  });

  test('should return the default value for out of bounds array index', () => {
    const object = { a: [10, 20, 30] };
    const result = get(object, 'a[5]', 'default');
    expect(result).toBe('default');
  });
});
