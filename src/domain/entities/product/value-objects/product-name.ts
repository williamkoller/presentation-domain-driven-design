import { DomainGuard } from '../../../../core/domain-guard';
import { Result } from '../../../../core/result';

export class ProductName {
  private constructor(private readonly value: string) {}

  public static create(name: string): Result<ProductName> {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(name, 'Product name'),
      DomainGuard.minLength(name, 3, 'PRoduct name'),
      DomainGuard.maxLength(name, 50, 'Product name'),
    ]);

    if (guard.isFailure) return Result.fail(guard.error!);

    return Result.ok(new ProductName(name));
  }

  public getValue(): string {
    return this.value;
  }

  public setProductName(value: string): Result<ProductName> {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(value, 'Product name'),
      DomainGuard.minLength(value, 3, 'PRoduct name'),
      DomainGuard.maxLength(value, 50, 'Product name'),
    ]);

    if (guard.isFailure) return Result.fail(guard.error!);

    return Result.ok(new ProductName(value));
  }
}
