import { Product } from './product';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';
import { ProductName } from './value-objects/product-name';

describe(Product.name, () => {
  const makeValidName = () => ProductName.create('Laptop').value;

  it('should create a valid product', () => {
    const name = makeValidName();
    const description = 'A high-end gaming laptop with great performance.';
    const product = Product.create(name, description);

    expect(product.value.id).toBeInstanceOf(UniqueId);
    expect(product.value.name.getValue()).toBe('Laptop');
    expect(product.value.description).toBe(description);

    const json = product.value.ToJSON();
    expect(json).toEqual({
      id: product.value.id.toString(),
      name: 'Laptop',
      description,
    });
  });

  it('should fail if description is invalid', () => {
    const name = makeValidName();
    const description = '';

    const result = Product.create(name, description);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('description should not be empty');
  });

  it('should update name and description', () => {
    const name = makeValidName();
    const description = 'Awesome headset for music and gaming.';
    const product = Product.create(name, description);

    const newName = ProductName.create('Headset').value;
    product.value.setName(newName);
    product.value.setDescription(
      'Over-ear wireless headset with noise cancelling.'
    );

    expect(product.value.name.getValue()).toBe('Headset');
    expect(product.value.description).toBe(
      'Over-ear wireless headset with noise cancelling.'
    );
  });

  it('should use custom id if provided', () => {
    const id = new UniqueId('custom-123');
    const name = makeValidName();
    const description = 'Custom ID test';

    const product = Product.create(name, description, id);

    expect(product.value.id.toString()).toBe('custom-123');
  });
});
