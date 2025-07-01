import { DomainGuard } from './domain-guard';
import { Result } from './result';

describe(DomainGuard.name, () => {
  describe('notEmpty', () => {
    it('should pass for non-empty string', () => {
      const result = DomainGuard.notEmpty('Hello', 'Name');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail for empty string', () => {
      const result = DomainGuard.notEmpty('', 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should fail for string with only spaces', () => {
      const result = DomainGuard.notEmpty('   ', 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should fail if value is undefined', () => {
      const result = DomainGuard.notEmpty(undefined as any, 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should fail if value is null', () => {
      const result = DomainGuard.notEmpty(null as any, 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should pass for string with content after trim', () => {
      const result = DomainGuard.notEmpty('  Hello  ', 'Name');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail for string that becomes empty after trim', () => {
      const result = DomainGuard.notEmpty('\t\n\r  ', 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should pass for zero-width characters (they are not considered empty)', () => {
      const result = DomainGuard.notEmpty('\u200B\u200C\u200D', 'Name');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle edge case: string with only unicode whitespace', () => {
      const result = DomainGuard.notEmpty(
        '\u00A0\u2000\u2001\u2002\u2003',
        'Name'
      );
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should handle edge case: string with mixed whitespace', () => {
      const result = DomainGuard.notEmpty(' \t\n\r\u00A0\u2000 ', 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should pass when value?.trim() returns truthy content', () => {
      const result = DomainGuard.notEmpty('a', 'Name');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail when value?.trim() returns empty string', () => {
      const result = DomainGuard.notEmpty('  ', 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should cover both branches of value?.trim() ternary operator', () => {
      const successResult = DomainGuard.notEmpty('valid', 'Name');
      expect(successResult.isSuccess).toBe(true);

      const failResult = DomainGuard.notEmpty('   ', 'Name');
      expect(failResult.isFailure).toBe(true);
      expect(failResult.error).toBe('Name should not be empty');
    });

    it('should cover line 32 TRUE branch: value?.trim() is truthy', () => {
      const testCases = [
        'a',
        'test',
        ' valid ',
        '\tvalid\n',
        'valid content',
        '123',
        'special-chars!@#',
      ];

      testCases.forEach((testCase) => {
        const result = DomainGuard.notEmpty(testCase, 'Name');
        expect(result.isSuccess).toBe(true);
      });
    });

    it('should cover line 32 FALSE branch: value?.trim() is falsy', () => {
      const testCases = [
        '',
        ' ',
        '  ',
        '\t',
        '\n',
        '\r',
        '\t\n\r',
        '   \t\n\r   ',
        '\u00A0',
        '\u2000\u2001\u2002',
      ];

      testCases.forEach((testCase) => {
        const result = DomainGuard.notEmpty(testCase, 'Name');
        expect(result.isFailure).toBe(true);
        expect(result.error).toBe('Name should not be empty');
      });
    });

    it('should handle edge case: value is undefined (value?.trim() is undefined)', () => {
      const result = DomainGuard.notEmpty(undefined as any, 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should handle edge case: value is null (value?.trim() is undefined)', () => {
      const result = DomainGuard.notEmpty(null as any, 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should handle edge case: value exists and trim() returns non-empty string', () => {
      const result = DomainGuard.notEmpty('content', 'Name');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle edge case: value exists but trim() returns empty string', () => {
      const result = DomainGuard.notEmpty('   ', 'Name');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });
  });

  describe('minLength', () => {
    it('should pass when length is equal to minimum', () => {
      const result = DomainGuard.minLength('abc', 3, 'Field');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail when length is less than minimum', () => {
      const result = DomainGuard.minLength('ab', 3, 'Field');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Field must be at least 3 characters');
    });

    it('should pass when length is greater than minimum', () => {
      const result = DomainGuard.minLength('abcd', 3, 'Field');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('maxLength', () => {
    it('should pass when length is equal to maximum', () => {
      const result = DomainGuard.maxLength('abc', 3, 'Field');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail when length exceeds maximum', () => {
      const result = DomainGuard.maxLength('abcd', 3, 'Field');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Field must be at most 3 characters');
    });

    it('should pass when length is less than maximum', () => {
      const result = DomainGuard.maxLength('ab', 3, 'Field');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('isInRange', () => {
    it('should pass if number is within range', () => {
      const result = DomainGuard.isInRange(5, 1, 10, 'Age');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if number is below range', () => {
      const result = DomainGuard.isInRange(0, 1, 10, 'Age');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Age must be between 1 and 10');
    });

    it('should fail if number is above range', () => {
      const result = DomainGuard.isInRange(11, 1, 10, 'Age');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Age must be between 1 and 10');
    });

    it('should pass if number equals minimum boundary', () => {
      const result = DomainGuard.isInRange(1, 1, 10, 'Age');
      expect(result.isSuccess).toBe(true);
    });

    it('should pass if number equals maximum boundary', () => {
      const result = DomainGuard.isInRange(10, 1, 10, 'Age');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle negative numbers', () => {
      const result = DomainGuard.isInRange(-5, -10, 0, 'Temperature');
      expect(result.isSuccess).toBe(true);
    });

    it('should handle decimal numbers', () => {
      const result = DomainGuard.isInRange(2.5, 1.0, 5.0, 'Score');
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('combine', () => {
    it('should return ok if all validations succeed', () => {
      const validations: Result<void>[] = [
        DomainGuard.notEmpty('a', 'Name'),
        DomainGuard.minLength('abc', 3, 'Name'),
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isSuccess).toBe(true);
    });

    it('should fail at the first failure', () => {
      const validations: Result<void>[] = [
        DomainGuard.notEmpty('', 'Name'),
        DomainGuard.minLength('abc', 3, 'Name'),
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });

    it('should handle empty array of validations', () => {
      const result = DomainGuard.combine([]);
      expect(result.isSuccess).toBe(true);
    });

    it('should handle array with successful results', () => {
      const validations: Result<void>[] = [
        Result.ok(),
        Result.ok(),
        Result.ok(),
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isSuccess).toBe(true);
    });

    it('should return first error when multiple validations fail', () => {
      const validations: Result<void>[] = [
        DomainGuard.notEmpty('valid', 'Name'),
        DomainGuard.minLength('a', 3, 'Name'),
        DomainGuard.maxLength('very long string', 5, 'Name'),
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name must be at least 3 characters');
    });

    it('should cover line 57: return Result.ok() after successful loop iteration', () => {
      const validations: Result<void>[] = [
        DomainGuard.notEmpty('valid', 'Name'),
        DomainGuard.minLength('valid', 3, 'Name'),
        DomainGuard.maxLength('valid', 10, 'Name'),
        DomainGuard.isInRange(5, 1, 10, 'Age'),
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isSuccess).toBe(true);
    });

    it('should iterate through all successful validations and return ok', () => {
      const validations: Result<void>[] = [];
      for (let i = 0; i < 10; i++) {
        validations.push(Result.ok());
      }
      const result = DomainGuard.combine(validations);
      expect(result.isSuccess).toBe(true);
    });

    it('should handle single successful validation and reach return statement', () => {
      const result = DomainGuard.combine([Result.ok()]);
      expect(result.isSuccess).toBe(true);
    });

    it('should handle complex successful validation chain', () => {
      const validations: Result<void>[] = [
        DomainGuard.notEmpty('test', 'field1'),
        DomainGuard.minLength('test', 1, 'field2'),
        DomainGuard.maxLength('test', 100, 'field3'),
        DomainGuard.isInRange(50, 1, 100, 'field4'),
        Result.ok(),
        Result.ok(),
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isSuccess).toBe(true);
    });

    it('should complete loop without early return and execute line 57', () => {
      const successfulValidations = Array(5)
        .fill(null)
        .map(() => Result.ok());
      const result = DomainGuard.combine(successfulValidations);
      expect(result.isSuccess).toBe(true);
    });
  });
});
