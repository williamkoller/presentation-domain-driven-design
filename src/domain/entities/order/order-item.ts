import { DomainGuard } from '../../../core/domain-guard';
import { Result } from '../../../core/result';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';
import { Product } from '../product/product';

export class OrderItem {
  private constructor(
    private readonly productId: UniqueId,
    private readonly quantity: number
  ) {}

  public static create(
    productId: UniqueId,
    quantity: number
  ): Result<OrderItem> {
    const guard = DomainGuard.isInRange(quantity, 1, 100, 'qualtity');
    if (guard.isFailure) return Result.fail(guard.error!);

    return Result.ok(new OrderItem(productId, quantity));
  }
}
