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
  }

  public static create(id: string, items: OrderItem[]): Result<Order> {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(id, 'order-id'),
      DomainGuard.isInRange(items.length, 1, 50, 'order-items'),
    ]);

    if (guard.isFailure) return Result.fail(guard.error!);

    const order = new Order(id, items);
    order.registerOrderCreatedEvent();

    return Result.ok(order);
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public registerOrderCreatedEvent(): void {
    this.addDomainEvent(new OrderCreatedEvent(this._id));
  }

  public toJSON(): {
    id: string;
    items: ReturnType<OrderItem['toJSON']>[];
  } {
    return {
      id: this._id,
      items: this.getItems().map((item) => item.toJSON()),
    };
  }
}
