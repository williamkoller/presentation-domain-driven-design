import { OrderItem } from '../../entities/order/order-item';

export class OrderItemTotalService {
  /**
   * Calcula a quantidade total a partir de uma lista de OrderItems.
   * @param items Array de instâncias de OrderItem
   * @returns Quantidade total como um número
   */
  public static calculateTotalQuantity(items: OrderItem[]): number {
    return items.reduce((total, item) => {
      return total + item.getQuantity();
    }, 0);
  }
}
