import { AggregateRoot } from '../../../core/aggregate-root';
import { DomainGuard } from '../../../core/domain-guard';
import { Result } from '../../../core/result';
import { OrderCreatedEvent } from '../../events/order/order-created-event';
import { OrderItem } from './order-item';

export class Order extends AggregateRoot<OrderItem> {
  private readonly items: OrderItem[] = [];

  private constructor(id: string, items: OrderItem[]) {
    super(id);
    this.items = items;
    this.addDomainEvent(new OrderCreatedEvent(id));
  }

  public static create(id: string, items: OrderItem[]): Result<Order> {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(id, 'order-id'),
      DomainGuard.isInRange(items.length, 1, 50, 'order-items'),
    ]);

    if (guard.isFailure) return Result.fail(guard.error!);

    return Result.ok(new Order(id, items));
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public toJSON() {
    return this.items.map((i) => ({
      productId: i.getProductId().toString(),
      quantity: i.getQuantity(),
    }));
  }
}
