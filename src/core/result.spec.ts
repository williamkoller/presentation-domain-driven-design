import { Result } from './result';

describe('Result', () => {
  describe('ok', () => {
    it('should create a successful Result with value', () => {
      const result = Result.ok('test');
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe('test');
      expect(result.error).toBeUndefined();
    });

    it('should create a successful Result without value', () => {
      const result = Result.ok();
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.error).toBeUndefined();
    });

    it('should create a successful Result with null value', () => {
      const result = Result.ok(null);
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe(null);
      expect(result.error).toBeUndefined();
    });

    it('should create a successful Result with zero value', () => {
      const result = Result.ok(0);
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe(0);
      expect(result.error).toBeUndefined();
    });

    it('should create a successful Result with empty string value', () => {
      const result = Result.ok('');
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe('');
      expect(result.error).toBeUndefined();
    });

    it('should create a successful Result with false value', () => {
      const result = Result.ok(false);
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe(false);
      expect(result.error).toBeUndefined();
    });
  });

  describe('fail', () => {
    it('should create a failed Result with error message', () => {
      const result = Result.fail('Something went wrong');
      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Something went wrong');
    });

    it('should throw when trying to access value of failed result', () => {
      const result = Result.fail('Error');
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });
  });

  describe('value getter - comprehensive branch coverage', () => {
    it('should throw if result is not successful (isSuccess = false)', () => {
      const result = Result.fail('error');
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should throw if successful result has undefined value', () => {
      const result = Result.ok();
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should return value when successful and value is defined', () => {
      const result = Result.ok('test');
      expect(result.value).toBe('test');
    });

    it('should return null value when successful and value is explicitly null', () => {
      const result = Result.ok(null);
      expect(result.value).toBe(null);
    });

    it('should return falsy values when successful and value is falsy but not undefined', () => {
      const falsyValues = [0, '', false, null];
      falsyValues.forEach((value) => {
        const result = Result.ok(value);
        expect(result.value).toBe(value);
      });
    });
  });

  describe('Result - value getter edge cases', () => {
    it('should throw if trying to get value of a failed result', () => {
      const result = Result.fail<string>('error message');
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should throw if trying to get undefined value from ok result', () => {
      const result = Result.ok<string>();
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should throw if successful result has explicitly undefined value', () => {
      const result = Result.ok<string>(undefined);
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should handle the double condition: !isSuccess OR _value === undefined', () => {
      const failedResult = Result.fail<string>('error');
      expect(() => failedResult.value).toThrow(
        'Cannot get value of failed result.'
      );

      const undefinedResult = Result.ok<string>();
      expect(() => undefinedResult.value).toThrow(
        'Cannot get value of failed result.'
      );
    });

    it('should cover line 46-47 LEFT side: !this.isSuccess is true', () => {
      const result = Result.fail<string>('test error');
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should cover line 46-47 RIGHT side: _value === undefined is true', () => {
      const result = Result.ok<string>();
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should cover line 46-47 BOTH false: success with defined value', () => {
      const result = Result.ok<string>('valid value');
      expect(result.value).toBe('valid value');
    });

    it('should test all branches of the OR condition in value getter', () => {
      const failResult = Result.fail<number>('error');
      expect(() => failResult.value).toThrow(
        'Cannot get value of failed result.'
      );

      const undefinedResult = Result.ok<number>();
      expect(() => undefinedResult.value).toThrow(
        'Cannot get value of failed result.'
      );

      const successResult = Result.ok<number>(42);
      expect(successResult.value).toBe(42);
    });

    it('should handle edge case: successful result with null value (not undefined)', () => {
      const result = Result.ok<string | null>(null);
      expect(result.value).toBe(null);
    });

    it('should handle edge case: successful result with falsy but defined values', () => {
      const falsyButDefinedValues = [0, false, '', null];
      falsyButDefinedValues.forEach((value) => {
        const result = Result.ok(value);
        expect(result.value).toBe(value);
      });
    });

    it('should handle edge case: explicitly passing undefined to Result.ok', () => {
      const result = Result.ok<string>(undefined);
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should cover EXACT line 46-47 branch: failed result with any _value', () => {
      const failedResult = Result.fail<any>('error');
      expect(() => failedResult.value).toThrow(
        'Cannot get value of failed result.'
      );
    });

    it('should cover EXACT line 46-47 branch: success but _value is undefined', () => {
      const result = Result.ok<string>(undefined);
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });

    it('should cover EXACT line 46-47 branch: success with null (not undefined)', () => {
      const result = Result.ok<string | null>(null);
      expect(result.value).toBe(null);
    });

    it('should cover EXACT line 46-47 branch: success with falsy non-undefined value', () => {
      const result = Result.ok<number>(0);
      expect(result.value).toBe(0);
    });

    it('should cover EXACT line 46-47 branch: success with truthy value', () => {
      const result = Result.ok<string>('value');
      expect(result.value).toBe('value');
    });

    it('should test every possible combination of the OR condition (!isSuccess || _value === undefined)', () => {
      const failedUndefined = Result.fail<string>('error');
      expect(() => failedUndefined.value).toThrow(
        'Cannot get value of failed result.'
      );

      const failedDefined = Result.fail<string>('error');
      expect(() => failedDefined.value).toThrow(
        'Cannot get value of failed result.'
      );

      const successUndefined = Result.ok<string>();
      expect(() => successUndefined.value).toThrow(
        'Cannot get value of failed result.'
      );

      const successDefined = Result.ok<string>('test');
      expect(successDefined.value).toBe('test');
    });
  });
});
