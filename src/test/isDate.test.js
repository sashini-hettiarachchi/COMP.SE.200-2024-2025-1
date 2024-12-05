import isDate from '../isDate.js';

describe('isDate', () => {
  test('should return true for valid Date objects', () => {
    expect(isDate(new Date())).toBe(true);
  });

  test('should return false for invalid Date objects', () => {
    expect(isDate(new Date('invalid date'))).toBe(false);
  });

  test('should return false for date-like strings', () => {
    expect(isDate('Mon April 23 2012')).toBe(false);
    expect(isDate('2023-01-01')).toBe(false);
    expect(isDate('')).toBe(false);
  });

  test('should return false for numbers', () => {
    expect(isDate(0)).toBe(false);
    expect(isDate(Date.now())).toBe(false); // Milliseconds since epoch
  });

  test('should return false for null and undefined', () => {
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  test('should return false for non-Date objects', () => {
    expect(isDate({})).toBe(false); // Plain object
    expect(isDate([])).toBe(false); // Array
    expect(isDate({ toString: () => '[object Date]' })).toBe(false); // Mimic Date
  });

  test('should return false for functions', () => {
    expect(isDate(() => new Date())).toBe(false);
    expect(isDate(function () { return new Date(); })).toBe(false);
  });

  test('should return true for custom objects inheriting from Date', () => {
    class CustomDate extends Date {}
    expect(isDate(new CustomDate())).toBe(true);
  });
});
