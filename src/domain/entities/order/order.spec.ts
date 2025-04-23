import { Order } from './order';
import { OrderItem } from './order-item';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';

describe(Order.name, () => {
  const makeValidItem = () => {
    const productId = new UniqueId();
    return OrderItem.create(productId, 2).value;
  };

  it('should create a valid order with items and add domain event', () => {
    const id = 'order-123';
    const items = [makeValidItem(), makeValidItem()];
    const result = Order.create(id, items);

    expect(result.isSuccess).toBe(true);

    const order = result.value;
    expect(order.getItems()).toHaveLength(2);

    const json = order.toJSON();
    expect(json[0]).toHaveProperty('productId');
    expect(json[0]).toHaveProperty('quantity');

    const events = (order as any)._domainEvents || [];
    expect(events.length).toBeGreaterThanOrEqual(1);
    expect(events[0].constructor.name).toBe('OrderCreatedEvent');
  });

  it('should fail if order id is empty', () => {
    const result = Order.create('', [makeValidItem()]);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('order-id should not be empty');
  });

  it('should fail if order has no items', () => {
    const result = Order.create('order-456', []);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('order-items must be between 1 and 50');
  });

  it('should serialize to JSON correctly', () => {
    const id = 'order-789';
    const item = makeValidItem();
    const order = Order.create(id, [item]).value;

    const json = order.toJSON();
    expect(json).toEqual([
      {
        productId: item.getProductId().toString(),
        quantity: item.getQuantity(),
      },
    ]);
  });
});
