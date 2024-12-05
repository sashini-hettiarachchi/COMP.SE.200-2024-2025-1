import isObject from '../isObject';

describe('isObject', () => {
  test('should return true for plain objects', () => {
    expect(isObject({})).toBe(true);
  });

  test('should return true for arrays', () => {
    expect(isObject([1, 2, 3])).toBe(true);
  });

  test('should return true for functions', () => {
    expect(isObject(function () {})).toBe(true);
    expect(isObject(() => {})).toBe(true); // Arrow function
  });

  test('should return true for object instances', () => {
    expect(isObject(new Object())).toBe(true);
    expect(isObject(new Number(42))).toBe(true); // Object wrapper for number
    expect(isObject(new String('Hello'))).toBe(true); // Object wrapper for string
  });

  test('should return true for custom objects created using classes', () => {
    class MyClass {}
    expect(isObject(new MyClass())).toBe(true);
  });

  test('should return true for objects created with no prototype', () => {
    expect(isObject(Object.create(null))).toBe(true);
  });

  test('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  test('should return false for primitive values', () => {
    expect(isObject(42)).toBe(false); // Number
    expect(isObject('Hello')).toBe(false); // String
    expect(isObject(true)).toBe(false); // Boolean
    expect(isObject(Symbol('sym'))).toBe(false); // Symbol
  });

  test('should return false for undefined', () => {
    expect(isObject(undefined)).toBe(false);
  });

  test('should return false for NaN', () => {
    expect(isObject(NaN)).toBe(false);
  });
});
