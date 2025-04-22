import { OrderItem } from '../../entities/order/order-item';

export class OrderItemTotalService {
  /**
   * Calculates the total quantity from a list of OrderItems.
   * @param items Array of OrderItem instances
   * @returns Total quantity as a number
   */
  public static calculateTotalQuantity(items: OrderItem[]): number {
    return items.reduce((total, item) => {
      return total + item.getQuantity();
    }, 0);
  }
}
