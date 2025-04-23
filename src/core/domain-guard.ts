import { Result } from './result';

/**
 * DomainGuard é uma utilidade de domínio (Domain Utility) responsável por validar regras de negócio e garantir a integridade de dados nas Entidades e Objetos de Valor.
 *
 * No contexto do Domain-Driven Design (DDD), ele atua como uma forma padronizada de aplicar **invariantes de domínio** — ou seja, regras que sempre devem ser verdadeiras.
 *
 * Cada método retorna um objeto `Result`, que indica sucesso (`Result.ok()`) ou falha (`Result.fail(errorMessage)`).
 *
 * Essa abordagem permite que erros sejam tratados de forma explícita e funcional, evitando exceções desnecessárias e promovendo código mais seguro e previsível.
 *
 * Métodos incluídos:
 * - `notEmpty`: Garante que uma string não esteja vazia ou em branco.
 * - `minLength`: Verifica se a string atende ao comprimento mínimo.
 * - `maxLength`: Verifica se a string não ultrapassa o comprimento máximo.
 * - `isInRange`: Valida se um número está dentro de um intervalo.
 * - `combine`: Agrega múltiplos resultados e retorna a primeira falha encontrada (ou sucesso se todos forem válidos).
 *
 * Exemplo de uso:
 * ```ts
 * const result = DomainGuard.combine([
 *   DomainGuard.notEmpty(name, 'Name'),
 *   DomainGuard.minLength(name, 3, 'Name')
 * ]);
 * if (result.isFailure) {
 *   throw new Error(result.error);
 * }
 * ```
 */
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
