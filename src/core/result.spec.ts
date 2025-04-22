import { Result } from './result';

describe(Result.name, () => {
  describe('ok', () => {
    it('should create a successful Result with value', () => {
      const result = Result.ok<number>(42);

      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe(42);
      expect(result.error).toBeUndefined();
    });

    it('should create a successful Result without value', () => {
      const result = Result.ok();

      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });
  });

  describe('fail', () => {
    it('should create a failed Result with error message', () => {
      const result = Result.fail('Something went wrong');

      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe('Something went wrong');
    });

    it('should throw when trying to access value of failed Result', () => {
      const result = Result.fail<number>('Invalid number');

      expect(() => result.value).toThrow('Cannot get value of failed result.');
    });
  });
});
