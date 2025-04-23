/**
 * A classe `Result<T>` representa o padrão de resultado explícito de operações no domínio, inspirado no conceito de **"Result Monad"** ou **"Either"**.
 *
 * Em vez de lançar exceções para representar falhas, ela encapsula o sucesso ou a falha de uma operação de forma segura e previsível.
 *
 * Esse padrão é amplamente utilizado no Domain-Driven Design (DDD) para tornar as invariantes explícitas e facilitar o fluxo de controle em código de domínio e aplicação.
 *
 * Propriedades:
 * - `isSuccess`: indica se a operação foi bem-sucedida.
 * - `isFailure`: indica se a operação falhou.
 * - `error`: contém a mensagem de erro em caso de falha.
 * - `value`: retorna o valor da operação em caso de sucesso, ou lança erro se for uma falha.
 *
 * Métodos estáticos:
 * - `ok<T>(value?)`: cria um resultado de sucesso, com ou sem valor.
 * - `fail<T>(error)`: cria um resultado de falha, com uma mensagem de erro.
 *
 * Exemplo de uso:
 * ```ts
 * const result = Result.ok<number>(42);
 * if (result.isSuccess) {
 *   console.log(result.value); // 42
 * }
 *
 * const errorResult = Result.fail('Invalid input');
 * if (errorResult.isFailure) {
 *   console.error(errorResult.error); // 'Invalid input'
 * }
 * ```
 */
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
