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

  it('should accept boundary values', () => {
    const minResult = OrderItem.create(validProductId, 1);
    expect(minResult.isSuccess).toBe(true);
    expect(minResult.value.getQuantity()).toBe(1);

    const maxResult = OrderItem.create(validProductId, 400);
    expect(maxResult.isSuccess).toBe(true);
    expect(maxResult.value.getQuantity()).toBe(400);
  });

  it('should fail for negative quantities', () => {
    const result = OrderItem.create(validProductId, -5);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should successfully create when validation passes', () => {
    const validQuantities = [1, 50, 100, 200, 300, 400];

    validQuantities.forEach((quantity) => {
      const result = OrderItem.create(validProductId, quantity);
      expect(result.isSuccess).toBe(true);
      expect(result.value.getQuantity()).toBe(quantity);
    });
  });

  it('should handle decimal quantities within range', () => {
    const result = OrderItem.create(validProductId, 10.5);
    expect(result.isSuccess).toBe(true);
    expect(result.value.getQuantity()).toBe(10.5);
  });

  it('should fail for very large quantities', () => {
    const result = OrderItem.create(validProductId, 1000);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should fail for zero quantity', () => {
    const result = OrderItem.create(validProductId, 0);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should cover line 16: return Result.fail when guard validation fails', () => {
    const productId = new UniqueId();

    const result = OrderItem.create(productId, -1);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should create an order item with valid data', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 2);

    expect(result.isSuccess).toBe(true);
    expect(result.value.getProductId()).toBe(productId);
    expect(result.value.getQuantity()).toBe(2);
  });

  it('should fail to create an order item with quantity less than 1', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 0);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should fail to create an order item with quantity greater than 400', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 401);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should create an order item with quantity at minimum boundary (1)', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 1);

    expect(result.isSuccess).toBe(true);
    expect(result.value.getQuantity()).toBe(1);
  });

  it('should create an order item with quantity at maximum boundary (400)', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 400);

    expect(result.isSuccess).toBe(true);
    expect(result.value.getQuantity()).toBe(400);
  });

  it('should serialize to JSON correctly', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 5);

    expect(result.isSuccess).toBe(true);
    const json = result.value.toJSON();
    expect(json).toEqual({
      productId: productId.toString(),
      quantity: 5,
    });
  });

  it('should handle edge case: quantity exactly 0 (boundary test)', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 0);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should handle edge case: very large quantity', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, 1000);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should handle edge case: negative quantity', () => {
    const productId = new UniqueId();
    const result = OrderItem.create(productId, -10);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should cover line 16 TRUE branch: guard.isFailure is true', () => {
    const productId = new UniqueId();

    const result = OrderItem.create(productId, 0);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('quantity must be between 1 and 400');
  });

  it('should cover line 16 FALSE branch: guard.isFailure is false, proceed to line 18', () => {
    const productId = new UniqueId();

    const result = OrderItem.create(productId, 5);

    expect(result.isSuccess).toBe(true);
    expect(result.value.getQuantity()).toBe(5);
  });

  it('should test all valid quantities to ensure line 18 is reached', () => {
    const productId = new UniqueId();

    const validQuantities = [1, 2, 10, 50, 100, 200, 300, 400];

    validQuantities.forEach((quantity) => {
      const result = OrderItem.create(productId, quantity);
      expect(result.isSuccess).toBe(true);
      expect(result.value.getQuantity()).toBe(quantity);
    });
  });

  it('should test boundary conditions for complete branch coverage', () => {
    const productId = new UniqueId();

    const minResult = OrderItem.create(productId, 1);
    expect(minResult.isSuccess).toBe(true);

    const maxResult = OrderItem.create(productId, 400);
    expect(maxResult.isSuccess).toBe(true);

    const belowMinResult = OrderItem.create(productId, 0);
    expect(belowMinResult.isFailure).toBe(true);

    const aboveMaxResult = OrderItem.create(productId, 401);
    expect(aboveMaxResult.isFailure).toBe(true);
  });
});
