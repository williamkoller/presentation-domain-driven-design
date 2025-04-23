import { DomainEvent } from './domain-event';

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

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
