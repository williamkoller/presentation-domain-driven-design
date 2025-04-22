import { ProductName } from './product-name';

describe(ProductName.name, () => {
  it('should create a valid ProductName', () => {
    const result = ProductName.create('Valid Product Name');

    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe('Valid Product Name');
  });

  it('should fail if name is empty', () => {
    const result = ProductName.create('');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should fail if name is too short', () => {
    const result = ProductName.create('Hi');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at least 3 characters');
  });

  it('should fail if name is too long', () => {
    const longName = 'A'.repeat(51);
    const result = ProductName.create(longName);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at most 50 characters');
  });

  it('should return a new instance on setProductName with valid name', () => {
    const original = ProductName.create('Original Name').value;
    const updated = original.setProductName('Updated Name');

    expect(updated.isSuccess).toBe(true);
    expect(updated.value.getValue()).toBe('Updated Name');
  });

  it('should fail on setProductName with invalid value', () => {
    const original = ProductName.create('Original').value;
    const updated = original.setProductName('');

    expect(updated.isFailure).toBe(true);
    expect(updated.error).toBe('Product name should not be empty');
  });
});
