import { DomainGuard } from '../../../core/domain-guard';
import { Result } from '../../../core/result';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';

export class OrderItem {
  private constructor(
    private readonly productId: UniqueId,
    private readonly quantity: number
  ) {}

  public static create(
    productId: UniqueId,
    quantity: number
  ): Result<OrderItem> {
    const guard = DomainGuard.isInRange(quantity, 1, 400, 'quantity');
    if (guard.isFailure) return Result.fail(guard.error!);

    return Result.ok(new OrderItem(productId, quantity));
  }
  public getProductId(): UniqueId {
    return this.productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public toJSON() {
    return {
      productId: this.getProductId().toString(),
      quantity: this.getQuantity(),
    };
  }
}
