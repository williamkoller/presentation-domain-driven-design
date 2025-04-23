import { OrderCreatedEvent } from './order-created-event';

describe(OrderCreatedEvent.name, () => {
  const orderId = 'order-001';

  it('should instantiate with correct order ID and event data', () => {
    const event = new OrderCreatedEvent(orderId);

    expect(event.getOrderId()).toBe(orderId);
    expect(event.eventName).toBe('OrderCreated');
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should serialize correctly with toJSON()', () => {
    const event = new OrderCreatedEvent(orderId);
    const json = event.toJSON();

    expect(json).toEqual({
      orderId,
      eventName: 'OrderCreated',
      occurredAt: event.occurredAt,
    });
  });

  it('should assign occurredAt to current timestamp on creation', () => {
    const before = new Date();
    const event = new OrderCreatedEvent(orderId);
    const after = new Date();

    expect(event.occurredAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(event.occurredAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
