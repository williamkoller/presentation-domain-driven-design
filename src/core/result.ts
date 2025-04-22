export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error?: string;
  private readonly _value?: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
  }

  public get value(): T {
    if (!this.isSuccess || this._value === undefined) {
      throw new Error('Cannot get value of failed result.');
    }

    return this._value;
  }

  public static ok<T = void>(value?: T): Result<T> {
    return new Result<T>(true, undefined, value);
  }

  public static fail<T = void>(error: string): Result<T> {
    return new Result<T>(false, error);
  }
}
