import { DomainGuard } from '../../../core/domain-guard';
import { Result } from '../../../core/result';
import { Product } from '../product/product';

export class OrderItem {
  private constructor(
    private readonly productId: string,
    private readonly quantity: number
  ) {}

  public static create(productId: string, quantity: number): Result<OrderItem> {
    const guard = DomainGuard.isInRange(quantity, 1, 100, 'qualtity');
    if (guard.isFailure) return Result.fail(guard.error!);

    return Result.ok(new OrderItem(productId, quantity));
  }
}
