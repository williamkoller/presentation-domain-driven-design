import { DomainEvent } from '../../../core/domain-event';

export class OrderCreatedEvent implements DomainEvent {
  occurredAt = new Date();
  eventName = 'OrderCreated';

  constructor(private readonly orderId: string) {}

  public getOrderId(): string {
    return this.orderId;
  }

  public toJSON(): object {
    return {
      orderId: this.getOrderId(),
      occurredAt: this.occurredAt,
      eventName: this.eventName,
    };
  }
}
