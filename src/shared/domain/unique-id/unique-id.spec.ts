import { UniqueId } from './unique-id';

describe(UniqueId.name, () => {
  it('should create a unique id without providing an id', () => {
    const id = new UniqueId();
    expect(id.toValue()).toBeDefined();
    expect(typeof id.toValue()).toBe('string');
  });

  it('should create a unique id with a provided string id', () => {
    const customId = 'custom-id-123';
    const id = new UniqueId(customId);
    expect(id.toValue()).toBe(customId);
  });

  it('should create a unique id with a provided number id', () => {
    const customId = 12345;
    const id = new UniqueId(customId);
    expect(id.toValue()).toBe(customId);
  });

  it('should generate different ids when created without parameters', () => {
    const id1 = new UniqueId();
    const id2 = new UniqueId();
    expect(id1.toValue()).not.toBe(id2.toValue());
  });

  it('should be equal when created with the same id', () => {
    const customId = 'same-id';
    const id1 = new UniqueId(customId);
    const id2 = new UniqueId(customId);
    expect(id1.equals(id2)).toBe(true);
  });

  it('should not be equal when created with different ids', () => {
    const id1 = new UniqueId('id-1');
    const id2 = new UniqueId('id-2');
    expect(id1.equals(id2)).toBe(false);
  });

  it('should handle falsy values correctly', () => {
    const falsyValues = [null, undefined, '', 0, false];

    falsyValues.forEach((falsyValue) => {
      const id = new UniqueId(falsyValue as any);
      if (!falsyValue) {
        expect(typeof id.toValue()).toBe('string');
        expect(id.toValue()).toMatch(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );
      } else {
        expect(id.toValue()).toBe(falsyValue);
      }
    });
  });

  it('should handle zero by generating UUID (0 is falsy)', () => {
    const id = new UniqueId(0);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle empty string by generating UUID', () => {
    const id = new UniqueId('');
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle null by generating UUID', () => {
    const id = new UniqueId(null as any);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle undefined by generating UUID', () => {
    const id = new UniqueId(undefined);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should cover line 27 TRUE branch: id is truthy', () => {
    const truthyValues = [
      'valid-id',
      'another-id',
      123,
      456,
      1,
      -1,
      'a',
      '0',
      ' ',
      [],
      {},
    ];

    truthyValues.forEach((truthyValue) => {
      const id = new UniqueId(truthyValue as any);
      expect(id.toValue()).toBe(truthyValue);
    });
  });

  it('should cover line 27 FALSE branch: id is falsy, use randomUUID()', () => {
    const falsyValues = [undefined, null, '', 0, false, NaN];

    falsyValues.forEach((falsyValue) => {
      const id = new UniqueId(falsyValue as any);
      expect(typeof id.toValue()).toBe('string');
      expect(id.toValue()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });
  });

  it('should handle specific edge case: number 0 (falsy)', () => {
    const id = new UniqueId(0);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle specific edge case: empty string (falsy)', () => {
    const id = new UniqueId('');
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle specific edge case: false boolean (falsy)', () => {
    const id = new UniqueId(false as any);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle specific edge case: NaN (falsy)', () => {
    const id = new UniqueId(NaN as any);
    expect(typeof id.toValue()).toBe('string');
    expect(id.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should handle specific edge case: positive number (truthy)', () => {
    const id = new UniqueId(42);
    expect(id.toValue()).toBe(42);
  });

  it('should handle specific edge case: negative number (truthy)', () => {
    const id = new UniqueId(-1);
    expect(id.toValue()).toBe(-1);
  });

  it('should handle specific edge case: string with content (truthy)', () => {
    const id = new UniqueId('test-id');
    expect(id.toValue()).toBe('test-id');
  });

  it('should cover EXACT line 27 TRUE branch: id ? id (truthy values)', () => {
    const truthyTestCases = [
      1,
      -1,
      'a',
      'test',
      '0',
      ' ',
      true,
      [],
      {},
      Infinity,
      -Infinity,
    ];

    truthyTestCases.forEach((testCase) => {
      const id = new UniqueId(testCase as any);
      expect(id.toValue()).toBe(testCase);
    });
  });

  it('should cover EXACT line 27 FALSE branch: randomUUID() (falsy values)', () => {
    const falsyTestCases = [undefined, null, 0, '', false, NaN];

    falsyTestCases.forEach((testCase) => {
      const id = new UniqueId(testCase as any);
      expect(typeof id.toValue()).toBe('string');
      expect(id.toValue()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });
  });

  it('should test both branches of line 27 ternary operator', () => {
    const truthyId = new UniqueId('truthy-value');
    expect(truthyId.toValue()).toBe('truthy-value');

    const falsyId = new UniqueId(null as any);
    expect(typeof falsyId.toValue()).toBe('string');
    expect(falsyId.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should test every JavaScript falsy value for line 27 FALSE branch', () => {
    const allFalsyValues = [
      false,
      0,
      -0,
      0n,
      '',
      null,
      undefined,
      NaN,
    ];

    allFalsyValues.forEach((falsyValue) => {
      const id = new UniqueId(falsyValue as any);
      expect(typeof id.toValue()).toBe('string');
      expect(id.toValue()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    });
  });

  it('should test non-obvious truthy values for line 27 TRUE branch', () => {
    const nonObviousTruthyValues = [
      '0',
      ' ',
      [],
      {},
      function () {},
      -1,
      Infinity,
      -Infinity,
    ];

    nonObviousTruthyValues.forEach((truthyValue) => {
      const id = new UniqueId(truthyValue as any);
      expect(id.toValue()).toBe(truthyValue);
    });
  });

  it('should achieve 100% branch coverage for line 27: id ? id : randomUUID()', () => {
    const truthyResult = new UniqueId('explicit-truthy');
    expect(truthyResult.toValue()).toBe('explicit-truthy');

    const falsyResult = new UniqueId(undefined);
    expect(typeof falsyResult.toValue()).toBe('string');
    expect(falsyResult.toValue()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });
});
