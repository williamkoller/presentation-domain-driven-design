import { Product } from './product';
import { UniqueId } from '../../../shared/domain/unique-id/unique-id';
import { ProductName } from './value-objects/product-name';

describe(Product.name, () => {
  const makeValidName = () => ProductName.create('Laptop').value;

  it('should create a valid product', () => {
    const name = makeValidName();
    const description = 'A high-end gaming laptop with great performance.';
    const product = Product.create(name, description);

    expect(typeof product.value.id).toBe('string');
    expect(product.value.id).toBeTruthy();
    expect(product.value.name.getValue()).toBe('Laptop');
    expect(product.value.description).toBe(description);

    const json = product.value.toJSON();
    expect(json).toEqual({
      id: product.value.id,
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

    expect(product.value.id).toBe('custom-123');
  });

  it('should throw error when trying to set invalid description', () => {
    const name = makeValidName();
    const description = 'Valid description for testing purposes.';
    const product = Product.create(name, description);

    expect(() => {
      product.value.setDescription('');
    }).toThrow('description should not be empty');
  });

  it('should throw error when trying to set description that is too short', () => {
    const name = makeValidName();
    const description = 'Valid description for testing purposes.';
    const product = Product.create(name, description);

    expect(() => {
      product.value.setDescription('short');
    }).toThrow('description must be at least 10 characters');
  });

  it('should throw error when trying to set description that is too long', () => {
    const name = makeValidName();
    const description = 'Valid description for testing purposes.';
    const product = Product.create(name, description);

    const longDescription = 'a'.repeat(256);
    expect(() => {
      product.value.setDescription(longDescription);
    }).toThrow('description must be at most 255 characters');
  });

  it('should create product and emit domain event', () => {
    const name = makeValidName();
    const description = 'A high-end gaming laptop with great performance.';
    const product = Product.create(name, description);

    expect(product.value.domainEvents).toHaveLength(1);
    expect(product.value.domainEvents[0].eventName).toBe('ProductCreated');
  });
});
