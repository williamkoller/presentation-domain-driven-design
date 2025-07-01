import { DomainEvent } from '../../../core/domain-event';

export class ProductCreatedEvent implements DomainEvent {
  public readonly eventName = 'ProductCreated';
  public readonly occurredAt = new Date();

  constructor(private readonly productId: string) {}

  public getProductId(): string {
    return this.productId;
  }
}
