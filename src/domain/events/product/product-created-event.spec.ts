import { ProductCreatedEvent } from './product-created-event';

describe(ProductCreatedEvent.name, () => {
  it('should create a ProductCreatedEvent with the correct properties', () => {
    const productId = 'product-123';
    const event = new ProductCreatedEvent(productId);

    expect(event.eventName).toBe('ProductCreated');
    expect(event.getProductId()).toBe(productId);
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should have occurredAt timestamp close to current time', () => {
    const beforeCreation = new Date();
    const event = new ProductCreatedEvent('product-456');
    const afterCreation = new Date();

    expect(event.occurredAt.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime()
    );
    expect(event.occurredAt.getTime()).toBeLessThanOrEqual(
      afterCreation.getTime()
    );
  });

  it('should store the product id correctly', () => {
    const productId = 'unique-product-id-789';
    const event = new ProductCreatedEvent(productId);

    expect(event.getProductId()).toBe(productId);
  });
});
