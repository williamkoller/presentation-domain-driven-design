/**
 * A classe `Identifier<T>` representa um **ID de entidade com valor imutável e identidade garantida**, seguindo os princípios do Domain-Driven Design (DDD).
 *
 * Em DDD, **Identidade** é uma característica essencial de uma Entidade. Essa classe ajuda a encapsular e proteger a comparação de IDs,
 * evitando comparações diretas com tipos primitivos e tornando o código mais seguro e expressivo.
 *
 * Vantagens:
 * - Torna a comparação de identidade explícita com `equals()`, ao invés de comparar `string` ou `number` diretamente.
 * - Permite tipagem genérica (`<T>`) para suportar diferentes tipos de IDs (ex: `string`, `number`, `UUID`, etc).
 * - Facilita testes e garante que comparações sejam feitas entre instâncias compatíveis.
 *
 * Métodos:
 * - `equals(id)`: compara se dois Identifiers são iguais, com verificação de tipo e valor.
 * - `toString()`: retorna a representação em string do valor interno.
 * - `toValue()`: retorna o valor primitivo encapsulado.
 *
 * Exemplo de uso:
 * ```ts
 * const id1 = new Identifier<string>('abc123');
 * const id2 = new Identifier<string>('abc123');
 * const id3 = new Identifier<string>('xyz789');
 *
 * console.log(id1.equals(id2)); // true
 * console.log(id1.equals(id3)); // false
 * ```
 */
export class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  toValue(): T {
    return this.value;
  }
}
