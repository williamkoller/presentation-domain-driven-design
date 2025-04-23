import { OrderItem } from './order-item';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';

describe(OrderItem.name, () => {
  const validProductId = new UniqueId();

  it('should create a valid OrderItem', () => {
    const result = OrderItem.create(validProductId, 10);

    expect(result.isSuccess).toBe(true);
    const item = result.value;

    expect(item.getProductId().toString()).toBe(validProductId.toString());
    expect(item.getQuantity()).toBe(10);
    expect(item.toJSON()).toEqual({
      productId: validProductId.toString(),
      quantity: 10,
    });
  });

  it('should fail if quantity is less than 1', () => {
    const result = OrderItem.create(validProductId, 0);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should fail if quantity is more than 400', () => {
    const result = OrderItem.create(validProductId, 401);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });
});
