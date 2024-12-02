import { expect } from 'chai';
import upperFirst from '../src/upperFirst.js';

describe('upperFirst', () => {
  // Basic scenarios
  it('should capitalize the first character of a lowercase word', () => {
    expect(upperFirst('fred')).to.equal('Fred');
  });

  it('should return the string unchanged if the first character is already uppercase', () => {
    expect(upperFirst('Fred')).to.equal('Fred');
    expect(upperFirst('FRED')).to.equal('FRED');
  });

  // Empty string scenarios
  it('should return an empty string if the input is an empty string', () => {
    expect(upperFirst('')).to.equal('');
  });

  // Special characters
  it('should not alter strings starting with non-alphabetic characters', () => {
    expect(upperFirst('1fred')).to.equal('1fred');
    expect(upperFirst('!fred')).to.equal('!fred');
    expect(upperFirst('_fred')).to.equal('_fred');
  });

  // Multi-word strings
  it('should only capitalize the first character of the first word', () => {
    expect(upperFirst('hello world')).to.equal('Hello world');
    expect(upperFirst('foo bar baz')).to.equal('Foo bar baz');
  });

  // Strings with spaces
  it('should handle strings with leading and trailing spaces correctly', () => {
    expect(upperFirst('  fred')).to.equal('  Fred');
    expect(upperFirst('fred  ')).to.equal('Fred  ');
    expect(upperFirst('  fred  ')).to.equal('  Fred  ');
  });

  // Strings with special unicode characters
  it('should correctly capitalize strings starting with special unicode characters', () => {
    expect(upperFirst('ßtring')).to.equal('ẞtring'); // German sharp S
    expect(upperFirst('ñame')).to.equal('Ñame'); // Spanish letter ñ
    expect(upperFirst('ørlando')).to.equal('Ørlando'); // Scandinavian letter ø
  });

  // Strings with numeric or non-alphabetic characters
  it('should handle strings starting with numeric characters correctly', () => {
    expect(upperFirst('123abc')).to.equal('123abc');
    expect(upperFirst('!hello')).to.equal('!hello');
  });

  // Nullish and undefined inputs
  it('should handle null and undefined inputs gracefully', () => {
    expect(upperFirst(null)).to.equal('');
    expect(upperFirst(undefined)).to.equal('');
  });

  // Strings with mixed cases
  it('should not alter the case of characters after the first character', () => {
    expect(upperFirst('fRED')).to.equal('FRED');
    expect(upperFirst('tEsT')).to.equal('TEsT');
  });

  // Strings with emojis or special symbols
  it('should correctly handle strings starting with emojis', () => {
    expect(upperFirst('😀test')).to.equal('😀test');
    expect(upperFirst('🎉happy')).to.equal('🎉happy');
  });

  // Input that is not a string
  it('should return an empty string for non-string inputs', () => {
    expect(upperFirst(123)).to.equal('');
    expect(upperFirst(true)).to.equal('');
    expect(upperFirst({})).to.equal('');
    expect(upperFirst([])).to.equal('');
  });
});
