import upperFirst from '../upperFirst.js';

describe('upperFirst', () => {
  // Basic scenarios
  test('should capitalize the first character of a lowercase word', () => {
    expect(upperFirst('fred')).toBe('Fred');
  });

  test('should return the string unchanged if the first character is already uppercase', () => {
    expect(upperFirst('Fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
  });

  // Empty string scenarios
  test('should return an empty string if the input is an empty string', () => {
    expect(upperFirst('')).toBe('');
  });

  // Special characters
  test('should not alter strings starting with non-alphabetic characters', () => {
    expect(upperFirst('1fred')).toBe('1fred');
    expect(upperFirst('!fred')).toBe('!fred');
    expect(upperFirst('_fred')).toBe('_fred');
  });

  // Multi-word strings
  test('should only capitalize the first character of the first word', () => {
    expect(upperFirst('hello world')).toBe('Hello world');
    expect(upperFirst('foo bar baz')).toBe('Foo bar baz');
  });

  // Strings with spaces
  test('should handle strings with leading and trailing spaces correctly', () => {
    expect(upperFirst('  fred')).toBe('  Fred');
    expect(upperFirst('fred  ')).toBe('Fred  ');
    expect(upperFirst('  fred  ')).toBe('  Fred  ');
  });

  // Strings with special unicode characters
  test('should correctly capitalize strings starting with special unicode characters', () => {
    expect(upperFirst('ßtring')).toBe('ẞtring'); // German sharp S
    expect(upperFirst('ñame')).toBe('Ñame'); // Spanish letter ñ
    expect(upperFirst('ørlando')).toBe('Ørlando'); // Scandinavian letter ø
  });

  // Strings with numeric or non-alphabetic characters
  test('should handle strings starting with numeric characters correctly', () => {
    expect(upperFirst('123abc')).toBe('123abc');
    expect(upperFirst('!hello')).toBe('!hello');
  });

  // Nullish and undefined inputs
  test('should handle null and undefined inputs gracefully', () => {
    expect(upperFirst(null)).toBe('');
    expect(upperFirst(undefined)).toBe('');
  });

  // Strings with mixed cases
  test('should not alter the case of characters after the first character', () => {
    expect(upperFirst('fRED')).toBe('FRED');
    expect(upperFirst('tEsT')).toBe('TEsT');
  });

  // Strings with emojis or special symbols
  test('should correctly handle strings starting with emojis', () => {
    expect(upperFirst('😀test')).toBe('😀test');
    expect(upperFirst('🎉happy')).toBe('🎉happy');
  });

  // Input that is not a string
  test('should return an empty string for non-string inputs', () => {
    expect(upperFirst(123)).toBe('');
    expect(upperFirst(true)).toBe('');
    expect(upperFirst({})).toBe('');
    expect(upperFirst([])).toBe('');
  });
});
