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
  });

  describe('isInRange', () => {
    it('should pass if number is within range', () => {
      const result = DomainGuard.isInRange(5, 1, 10, 'Age');
      expect(result.isSuccess).toBe(true);
    });

    it('should fail if number is below range', () => {
      const result = DomainGuard.isInRange(0, 1, 10, 'Age');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Age must be betwenn 1 and 10');
    });

    it('should fail if number is above range', () => {
      const result = DomainGuard.isInRange(11, 1, 10, 'Age');
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Age must be betwenn 1 and 10');
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
        DomainGuard.minLength('abc', 3, 'Name'), // won’t be reached
      ];
      const result = DomainGuard.combine(validations);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Name should not be empty');
    });
  });
});
