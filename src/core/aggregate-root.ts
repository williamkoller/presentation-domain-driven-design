import { DomainEvent } from './domain-event';

/**
 * Aggregate Root é o ponto de entrada para um conjunto de objetos relacionados dentro de um mesmo boundary (limite) de consistência.
 *
 * No Domain-Driven Design (DDD), um Aggregate é um cluster de entidades e objetos de valor que são tratados como uma única unidade.
 * O Aggregate Root é a entidade principal desse cluster, e é responsável por garantir a consistência e integridade dos dados dentro do Aggregate.
 *
 * - Toda modificação no estado do Aggregate deve passar pelo Aggregate Root.
 * - Nenhuma entidade interna ao Aggregate deve ser acessada diretamente por fora dele.
 * - O Aggregate Root também é responsável por emitir Domain Events quando alguma mudança relevante acontece.
 *
 * Esta classe abstrata fornece funcionalidades básicas:
 * - Armazenamento de eventos de domínio (Domain Events).
 * - Identificador único do Aggregate (`_id`).
 * - Métodos para adicionar e limpar eventos.
 *
 * Ela deve ser estendida por entidades que atuam como raiz de um Aggregate, como `Order`, `Customer`, `Invoice`, etc.
 */
export abstract class AggregateRoot<T> {
  protected readonly _id: string;
  private _domainEvents: DomainEvent[] = [];

  protected constructor(id: string) {
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  abstract toJSON(): any;
}
