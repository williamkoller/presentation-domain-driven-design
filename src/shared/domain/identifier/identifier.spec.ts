import { Identifier } from './identifier';

describe(Identifier.name, () => {
  it('should return true when comparing two identifiers with same value', () => {
    const id1 = new Identifier('123');
    const id2 = new Identifier('123');

    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false when comparing two identifiers with different values', () => {
    const id1 = new Identifier('123');
    const id2 = new Identifier('456');

    expect(id1.equals(id2)).toBe(false);
  });

  it('should return false when comparing with undefined', () => {
    const id = new Identifier('123');
    expect(id.equals(undefined)).toBe(false);
  });

  it('should return false when comparing with null', () => {
    const id = new Identifier('123');
    expect(id.equals(null)).toBe(false);
  });

  it('should return false when comparing with a different class instance', () => {
    class OtherIdentifier<T> extends Identifier<T> {}

    const id1 = new Identifier('123');
    const id2 = new OtherIdentifier('123');

    expect(id1.equals(id2)).toBe(true);
  });

  it('should return correct string from toString()', () => {
    const id = new Identifier(123);
    expect(id.toString()).toBe('123');
  });

  it('should return correct value from toValue()', () => {
    const id = new Identifier(999);
    expect(id.toValue()).toBe(999);
  });
});

class OtherIdentifier<T> extends Identifier<T> {}

describe('Identifier - instanceof check', () => {
  it('should return false when comparing with instance of different subclass', () => {
    const id1 = new Identifier('abc');
    const id2 = new OtherIdentifier('abc');
    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false when comparing with same value but different constructor', () => {
    class FakeIdentifier {
      constructor(private value: string) {}
      toValue() {
        return this.value;
      }
    }

    const id1 = new Identifier('abc');
    const fake = new FakeIdentifier('abc') as any;
    expect(id1.equals(fake)).toBe(false);
  });
});
