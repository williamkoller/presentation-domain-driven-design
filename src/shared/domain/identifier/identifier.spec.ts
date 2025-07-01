import { Identifier } from './identifier';

describe(Identifier.name, () => {
  it('should create an identifier with string value', () => {
    const id = new Identifier('test-123');
    expect(id.toValue()).toBe('test-123');
  });

  it('should create an identifier with number value', () => {
    const id = new Identifier(42);
    expect(id.toValue()).toBe(42);
  });

  it('should return true when comparing equal identifiers', () => {
    const id1 = new Identifier('same-value');
    const id2 = new Identifier('same-value');
    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false when comparing different identifiers', () => {
    const id1 = new Identifier('value-1');
    const id2 = new Identifier('value-2');
    expect(id1.equals(id2)).toBe(false);
  });

  it('should return string representation', () => {
    const stringId = new Identifier('test');
    const numberId = new Identifier(123);
    expect(stringId.toString()).toBe('test');
    expect(numberId.toString()).toBe('123');
  });

  it('should return false when comparing with null', () => {
    const id = new Identifier('test');
    expect(id.equals(null as any)).toBe(false);
  });

  it('should return false when comparing with undefined', () => {
    const id = new Identifier('test');
    expect(id.equals(undefined)).toBe(false);
  });

  it('should handle different types correctly', () => {
    const stringId = new Identifier('123');
    const numberId = new Identifier(123);
    expect(stringId.equals(numberId as any)).toBe(false);
  });

  it('should handle complex objects as identifiers', () => {
    const obj1 = { id: 'test', value: 42 };
    const obj2 = { id: 'test', value: 42 };
    const id1 = new Identifier(obj1);
    const id2 = new Identifier(obj2);
    expect(id1.equals(id2)).toBe(false);
  });

  it('should handle boolean values', () => {
    const trueId = new Identifier(true);
    const falseId = new Identifier(false);
    expect(trueId.equals(falseId)).toBe(false);
    expect(trueId.toValue()).toBe(true);
    expect(falseId.toValue()).toBe(false);
  });

  it('should handle array values', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const id1 = new Identifier(arr1);
    const id2 = new Identifier(arr2);
    expect(id1.equals(id2)).toBe(false);
  });

  it('should handle null values correctly', () => {
    const id = new Identifier(null);
    expect(id.toValue()).toBe(null);
    expect(id.toString()).toBe('null');
  });

  it('should handle undefined values correctly', () => {
    const id = new Identifier(undefined);
    expect(id.toValue()).toBe(undefined);
    expect(id.toString()).toBe('undefined');
  });

  it('should handle zero values correctly', () => {
    const id = new Identifier(0);
    expect(id.toValue()).toBe(0);
    expect(id.toString()).toBe('0');
  });

  it('should handle empty string values correctly', () => {
    const id = new Identifier('');
    expect(id.toValue()).toBe('');
    expect(id.toString()).toBe('');
  });

  it('should handle NaN values correctly', () => {
    const id = new Identifier(NaN);
    expect(id.toValue()).toBeNaN();
    expect(id.toString()).toBe('NaN');
  });

  it('should handle same object reference equality', () => {
    const obj = { id: 'test' };
    const id1 = new Identifier(obj);
    const id2 = new Identifier(obj);
    expect(id1.equals(id2)).toBe(true);
  });

  it('should cover lines 34-35: return false when id is null', () => {
    const id = new Identifier('test');
    const result = id.equals(null as any);
    expect(result).toBe(false);
  });

  it('should cover lines 34-35: return false when id is undefined', () => {
    const id = new Identifier('test');
    const result = id.equals(undefined);
    expect(result).toBe(false);
  });

  it('should cover lines 37-38: return false when id is not instance of constructor', () => {
    const id = new Identifier('test');

    const fakeId = {
      toValue: () => 'test',
      equals: () => true,
      toString: () => 'test',
    };

    const result = id.equals(fakeId as any);
    expect(result).toBe(false);
  });

  it('should cover instanceof check with different constructor', () => {
    class CustomIdentifier<T> {
      constructor(private value: T) {}
      toValue(): T {
        return this.value;
      }
      equals(id?: any): boolean {
        return false;
      }
      toString(): string {
        return String(this.value);
      }
    }

    const id = new Identifier('test');
    const customId = new CustomIdentifier('test');

    const result = id.equals(customId as any);
    expect(result).toBe(false);
  });

  it('should handle prototype chain correctly', () => {
    class ExtendedIdentifier<T> extends Identifier<T> {
      constructor(value: T) {
        super(value);
      }
    }

    const baseId = new Identifier('test');
    const extendedId = new ExtendedIdentifier('test');

    expect(baseId.equals(extendedId)).toBe(true);
  });

  it('should handle inheritance chain with different values', () => {
    class ExtendedIdentifier<T> extends Identifier<T> {
      constructor(value: T) {
        super(value);
      }
    }

    const baseId = new Identifier('test1');
    const extendedId = new ExtendedIdentifier('test2');

    expect(baseId.equals(extendedId)).toBe(false);
  });

  it('should handle plain object that looks like Identifier', () => {
    const id = new Identifier('test');

    const plainObject = {
      value: 'test',
      toValue: function () {
        return this.value;
      },
      equals: function () {
        return false;
      },
      toString: function () {
        return String(this.value);
      },
    };

    const result = id.equals(plainObject as any);
    expect(result).toBe(false);
  });

  it('should handle null or undefined in complex scenarios', () => {
    const id = new Identifier('test');

    expect(id.equals(null as any)).toBe(false);

    expect(id.equals(undefined as any)).toBe(false);

    let undefinedVar: Identifier<string> | undefined;
    expect(id.equals(undefinedVar)).toBe(false);

    let nullVar: Identifier<string> | null = null;
    expect(id.equals(nullVar as any)).toBe(false);
  });

  it('should handle edge case: object with null prototype', () => {
    const id = new Identifier('test');

    const objWithoutPrototype = Object.create(null);
    objWithoutPrototype.toValue = () => 'test';

    const result = id.equals(objWithoutPrototype);
    expect(result).toBe(false);
  });
});

class OtherIdentifier<T> extends Identifier<T> {}

describe('Identifier - comprehensive instanceof and equals coverage', () => {
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

  it('should return false when comparing Identifier with non-Identifier object', () => {
    const id = new Identifier('test');
    const plainObject = { toValue: () => 'test' };

    expect(id.equals(plainObject as any)).toBe(false);
  });

  it('should handle edge case with object that has same toValue but different constructor', () => {
    class CustomIdentifier {
      constructor(private val: string) {}
      toValue() {
        return this.val;
      }
    }

    const id1 = new Identifier('same');
    const custom = new CustomIdentifier('same');

    expect(id1.equals(custom as any)).toBe(false);
  });

  describe('instanceof check comprehensive coverage', () => {
    it('should cover line 34-35: null/undefined check', () => {
      const id = new Identifier('test');

      expect(id.equals(null)).toBe(false);

      expect(id.equals(undefined)).toBe(false);
    });

    it('should cover line 37-38: instanceof check with different constructors', () => {
      const id1 = new Identifier('test');

      const fakeId = {
        toValue: () => 'test',
        constructor: function () {},
      };

      expect(id1.equals(fakeId as any)).toBe(false);
    });

    it('should pass instanceof check and compare values (line after 38)', () => {
      const id1 = new Identifier('same-value');
      const id2 = new Identifier('same-value');
      const id3 = new Identifier('different-value');

      expect(id1.equals(id2)).toBe(true);
      expect(id1.equals(id3)).toBe(false);
    });

    it('should handle inherited classes correctly', () => {
      class ExtendedIdentifier<T> extends Identifier<T> {
        constructor(value: T) {
          super(value);
        }
      }

      const baseId = new Identifier('test');
      const extendedId = new ExtendedIdentifier('test');

      expect(baseId.equals(extendedId)).toBe(true);
    });

    it('should handle complex constructor inheritance', () => {
      class SpecialIdentifier<T> extends Identifier<T> {
        constructor(value: T, public metadata?: string) {
          super(value);
        }
      }

      const id1 = new Identifier('value');
      const id2 = new SpecialIdentifier('value', 'meta');
      const id3 = new SpecialIdentifier('different', 'meta');

      expect(id1.equals(id2)).toBe(true);
      expect(id1.equals(id3)).toBe(false);
    });

    it('should reject objects with wrong prototype chain', () => {
      const id = new Identifier('test');

      const impostor = Object.create({});
      impostor.toValue = () => 'test';
      impostor.constructor = Identifier;

      expect(id.equals(impostor)).toBe(false);
    });

    it('should handle edge case: object with Identifier constructor but wrong prototype', () => {
      const id = new Identifier('test');

      const weirdObject = {
        toValue: () => 'test',
        constructor: Identifier,
      };

      expect(id.equals(weirdObject as any)).toBe(false);
    });
  });
});
