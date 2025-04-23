import { OrderItemTotalService } from './order-item-total.service';
import { OrderItem } from '../../entities/order/order-item';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';

describe(OrderItemTotalService, () => {
  const createItem = (quantity: number): OrderItem => {
    const productId = new UniqueId();
    return OrderItem.create(productId, quantity).value;
  };

  it('should return 0 if no items are provided', () => {
    const result = OrderItemTotalService.calculateTotalQuantity([]);
    expect(result).toBe(0);
  });

  it('should return the correct total quantity for a single item', () => {
    const item = createItem(5);
    const result = OrderItemTotalService.calculateTotalQuantity([item]);
    expect(result).toBe(5);
  });

  it('should return the correct total quantity for multiple items', () => {
    const items = [createItem(2), createItem(3), createItem(5)];
    const result = OrderItemTotalService.calculateTotalQuantity(items);
    expect(result).toBe(10);
  });
});
