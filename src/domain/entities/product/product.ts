import { AggregateRoot } from '../../../core/aggregate-root';
import { DomainGuard } from '../../../core/domain-guard';
import { Result } from '../../../core/result';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';
import { ProductName } from './value-objects/product-name';
import { ProductCreatedEvent } from '../../events/product/product-created-event';

export class Product extends AggregateRoot<Product> {
  constructor(
    private _name: ProductName,
    private _description: string,
    id?: UniqueId
  ) {
    super(id?.toString() || new UniqueId().toString());
    this.validate();
  }

  get name(): ProductName {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public setName(value: ProductName): void {
    this._name = value;
  }

  public setDescription(value: string): void {
    this._description = value;
    this.validate();
  }

  private validate(): void {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(this._description, 'description'),
      DomainGuard.minLength(this._description, 10, 'description'),
      DomainGuard.maxLength(this._description, 255, 'description'),
    ]);

    if (guard.isFailure) {
      throw new Error(guard.error);
    }
  }

  public static create(
    name: ProductName,
    description: string,
    id?: UniqueId
  ): Result<Product> {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(description, 'description'),
      DomainGuard.minLength(description, 10, 'description'),
      DomainGuard.maxLength(description, 255, 'description'),
    ]);

    if (guard.isFailure) return Result.fail(guard.error!);

    const product = new Product(name, description, id);
    product.addDomainEvent(new ProductCreatedEvent(product.id));

    return Result.ok(product);
  }

  public toJSON(): {
    id: string;
    name: string;
    description: string;
  } {
    return {
      id: this.id,
      name: this.name.getValue(),
      description: this.description,
    };
  }
}
