import { DomainGuard } from '../../../core/domain-guard';
import { Result } from '../../../core/result';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';
import { ProductName } from './value-objects/product-name';

export class Product {
  protected readonly _id: UniqueId;
  constructor(
    private _name: ProductName,
    private _description: string,
    id?: UniqueId
  ) {
    this._id = id || new UniqueId();
    this.validate();
  }

  get id(): UniqueId {
    return this._id;
  }

  get name(): ProductName {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public setName(value: ProductName) {
    this._name = value;
  }

  public setDescription(value: string) {
    this._description = value;
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
    return Result.ok(product);
  }

  public ToJSON() {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      description: this.description,
    };
  }
}
