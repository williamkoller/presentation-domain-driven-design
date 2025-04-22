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

  setName(value: ProductName) {
    this._name.setProductName(value.getValue());
  }

  setDescription(value: string) {
    this._description = value;
  }

  private validate(): void {
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(this._description, 'description'),
      DomainGuard.minLength(this._description, 10, 'description'),
      DomainGuard.maxLength(this._description, 255, 'description'),
    ]);

    if (guard.isFailure) Result.fail(guard.error!);
  }

  public static create(
    name: ProductName,
    description: string,
    id?: UniqueId
  ): Product {
    const productId = id ?? new UniqueId();
    return new Product(name, description, productId);
  }

  public ToJSON() {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      description: this.description,
    };
  }
}
