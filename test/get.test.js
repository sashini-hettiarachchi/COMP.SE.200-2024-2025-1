import { expect } from 'chai';
import get from '../src/get.js';

describe('get function', () => {
  
  // 1. Basic Existence of Property
  it('should return the value when the property exists at the given path (string format)', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 'a.b.c');
    expect(result).to.equal(3);
  });

  it('should return the value when the property exists at the given path (array format)', () => {
    const object = { a: [{ b: { c: 3 } }] };
    const result = get(object, ['a', '0', 'b', 'c']);
    expect(result).to.equal(3);
  });

  // 2. Property Does Not Exist (with Default Value)
  it('should return the default value when the property does not exist (string format)', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 'a.b.d', 'default');
    expect(result).to.equal('default');
  });

  it('should return the default value when the property does not exist (array format)', () => {
    const object = { a: [{ b: { c: 3 } }] };
    const result = get(object, ['a', '0', 'b', 'd'], 'default');
    expect(result).to.equal('default');
  });

  // 3. Edge Case: Null or Undefined Object
  it('should return undefined if the object is null', () => {
    const result = get(null, 'a.b.c');
    expect(result).to.equal(undefined);
  });

  it('should return undefined if the object is undefined', () => {
    const result = get(undefined, 'a.b.c');
    expect(result).to.equal(undefined);
  });

  it('should return the default value if the object is null or undefined', () => {
    const result = get(null, 'a.b.c', 'default');
    expect(result).to.equal('default');

    const result2 = get(undefined, 'a.b.c', 'default');
    expect(result2).to.equal('default');
  });

  // 4. Deeply Nested Path
  it('should return the correct value for deeply nested path (string format)', () => {
    const object = { a: { b: { c: { d: { e: 5 } } } } };
    const result = get(object, 'a.b.c.d.e');
    expect(result).to.equal(5);
  });

  it('should return the correct value for deeply nested path (array format)', () => {
    const object = { a: [{ b: { c: { d: { e: 5 } } } }] };
    const result = get(object, ['a', '0', 'b', 'c', 'd', 'e']);
    expect(result).to.equal(5);
  });

  // 5. Using Non-Existent Default Value
  it('should return the default value when the value at the path is undefined (string format)', () => {
    const object = { a: { b: undefined } };
    const result = get(object, 'a.b', 'default');
    expect(result).to.equal('default');
  });

  it('should return the default value when the value at the path is undefined (array format)', () => {
    const object = { a: [{ b: undefined }] };
    const result = get(object, ['a', '0', 'b'], 'default');
    expect(result).to.equal('default');
  });

  // 6. Invalid Path Types
  it('should return undefined when an invalid path type (non-string or array) is passed', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 123); // Invalid path type
    expect(result).to.equal(undefined);
  });

  it('should return the default value when an invalid path type (non-string or array) is passed', () => {
    const object = { a: { b: { c: 3 } } };
    const result = get(object, 123, 'default'); // Invalid path type
    expect(result).to.equal('default');
  });

  // 7. Edge Case: Empty Object
  it('should return undefined if the object is empty', () => {
    const object = {};
    const result = get(object, 'a.b.c');
    expect(result).to.equal(undefined);
  });

  it('should return the default value if the object is empty and default is passed', () => {
    const object = {};
    const result = get(object, 'a.b.c', 'default');
    expect(result).to.equal('default');
  });

  // 8. Arrays as Objects
  it('should return correct value for array index', () => {
    const object = { a: [10, 20, 30] };
    const result = get(object, 'a[1]');
    expect(result).to.equal(20);
  });

  it('should return the default value for out of bounds array index', () => {
    const object = { a: [10, 20, 30] };
    const result = get(object, 'a[5]', 'default');
    expect(result).to.equal('default');
  });
});