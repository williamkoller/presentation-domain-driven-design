import { DomainEvent } from '../../../core/domain-event';

export class OrderCreatedEvent implements DomainEvent {
  occurredAt = new Date();
  eventName = 'OrderCreated';

  constructor(private readonly orderId: string) {}
}
