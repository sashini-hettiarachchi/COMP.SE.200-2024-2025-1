import { expect } from 'chai';
import get from '../src/get.js';

describe('get', () => {
  const object = { 'a': [{ 'b': { 'c': 3 } }] };

  it('should get the value at the specified path (string path)', () => {
    expect(get(object, 'a[0].b.c')).to.equal(3);
  });

  it('should get the value at the specified path (array path)', () => {
    expect(get(object, ['a', '0', 'b', 'c'])).to.equal(3);
  });

  it('should return the default value if the resolved value is undefined (string path)', () => {
    expect(get(object, 'a.b.c', 'default')).to.equal('default');
  });

  it('should return the default value if the resolved value is undefined (array path)', () => {
    expect(get(object, ['a', 'b', 'c'], 'default')).to.equal('default');
  });

  it('should return undefined if the resolved value is undefined and no default value is provided', () => {
    expect(get(object, 'a.b.c')).to.be.undefined;
  });

  it('should return the default value if the object is null or undefined', () => {
    expect(get(null, 'a.b.c', 'default')).to.equal('default');
    expect(get(undefined, 'a.b.c', 'default')).to.equal('default');
  });
});