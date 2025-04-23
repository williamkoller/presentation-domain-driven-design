import { Result } from './result';

export class DomainGuard {
  static notEmpty(value: string, field: string): Result<void> {
    return value?.trim()
      ? Result.ok()
      : Result.fail(`${field} should not be empty`);
  }

  static minLength(value: string, min: number, field: string): Result<void> {
    return value.length >= min
      ? Result.ok()
      : Result.fail(`${field} must be at least ${min} characters`);
  }

  static maxLength(value: string, max: number, field: string): Result<void> {
    return value.length <= max
      ? Result.ok()
      : Result.fail(`${field} must be at most ${max} characters`);
  }

  static isInRange(
    value: number,
    min: number,
    max: number,
    field: string
  ): Result<void> {
    return value >= min && value <= max
      ? Result.ok()
      : Result.fail(`${field} must be between ${min} and ${max}`);
  }

  static combine(results: Result<any>[]): Result<void> {
    for (const r of results) {
      if (r.isFailure) return Result.fail(r.error!);
    }
    return Result.ok();
  }
}
