import { randomUUID } from 'node:crypto';
import { Identifier } from '../identifier/identifier';

/**
 * `UniqueId` é uma especialização da classe `Identifier` que gera automaticamente um identificador único,
 * geralmente usado para entidades e objetos que precisam de uma identidade globalmente única (como UUIDs).
 *
 * Essa classe é muito útil em projetos com DDD, pois padroniza a forma como os IDs são criados e utilizados,
 * garantindo consistência e encapsulando a lógica de geração de IDs.
 *
 * Características:
 * - Herda o comportamento de identidade da classe `Identifier`.
 * - Gera um `UUID` automaticamente (via `crypto.randomUUID`) caso nenhum ID seja informado no construtor.
 * - Permite também aceitar um `id` previamente definido (útil ao reconstruir entidades a partir do banco de dados).
 *
 * Exemplo de uso:
 * ```ts
 * const id1 = new UniqueId(); // Gera UUID automaticamente
 * const id2 = new UniqueId('user-123'); // Usa um ID fornecido
 *
 * console.log(id1.toValue()); // e.g. 'd9f5e860-5dfb-4b58-9940-ecb3e3e92830'
 * console.log(id2.equals(new UniqueId('user-123'))); // true
 * ```
 */
export class UniqueId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : randomUUID());
  }
}
