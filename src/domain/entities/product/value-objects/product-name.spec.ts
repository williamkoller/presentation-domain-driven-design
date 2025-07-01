import { ProductName } from './product-name';

describe(ProductName.name, () => {
  it('should create a valid product name', () => {
    const result = ProductName.create('Valid Product Name');

    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe('Valid Product Name');
  });

  it('should fail to create a product name with empty value', () => {
    const result = ProductName.create('');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should fail to create a product name with only spaces', () => {
    const result = ProductName.create('   ');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should fail to create a product name with less than 3 characters', () => {
    const result = ProductName.create('AB');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at least 3 characters');
  });

  it('should fail to create a product name with more than 50 characters', () => {
    const longName = 'A'.repeat(51);
    const result = ProductName.create(longName);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at most 50 characters');
  });

  it('should create a product name with exactly 3 characters', () => {
    const result = ProductName.create('ABC');

    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe('ABC');
  });

  it('should create a product name with exactly 50 characters', () => {
    const name = 'A'.repeat(50);
    const result = ProductName.create(name);

    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe(name);
  });

  it('should successfully set a new product name', () => {
    const productName = ProductName.create('Original Name');
    expect(productName.isSuccess).toBe(true);

    const updatedResult = productName.value.setProductName('Updated Name');
    expect(updatedResult.isSuccess).toBe(true);
    expect(updatedResult.value.getValue()).toBe('Updated Name');
  });

  it('should fail to set an invalid product name', () => {
    const productName = ProductName.create('Original Name');
    expect(productName.isSuccess).toBe(true);

    const updatedResult = productName.value.setProductName('');
    expect(updatedResult.isFailure).toBe(true);
    expect(updatedResult.error).toBe('Product name should not be empty');
  });

  it('should fail to set product name with less than 3 characters', () => {
    const productName = ProductName.create('Original Name');
    expect(productName.isSuccess).toBe(true);

    const updatedResult = productName.value.setProductName('AB');
    expect(updatedResult.isFailure).toBe(true);
    expect(updatedResult.error).toBe(
      'Product name must be at least 3 characters'
    );
  });

  it('should fail to set product name with more than 50 characters', () => {
    const productName = ProductName.create('Original Name');
    expect(productName.isSuccess).toBe(true);

    const longName = 'A'.repeat(51);
    const updatedResult = productName.value.setProductName(longName);
    expect(updatedResult.isFailure).toBe(true);
    expect(updatedResult.error).toBe(
      'Product name must be at most 50 characters'
    );
  });

  it('should handle edge case: name with only whitespace characters', () => {
    const result = ProductName.create('\t\n\r   ');
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should handle edge case: name with unicode whitespace', () => {
    const result = ProductName.create('\u00A0\u2000\u2001');
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should handle boundary case: exactly minimum length after trim', () => {
    const result = ProductName.create('  ABC  ');
    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe('  ABC  ');
  });

  it('should handle boundary case: exactly maximum length', () => {
    const name = 'A'.repeat(50);
    const result = ProductName.create(name);
    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe(name);
  });

  it('should cover line 14: return Result.fail when guard validation fails in create', () => {
    const result = ProductName.create('');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should cover line 14: return Result.fail with minLength validation failure', () => {
    const result = ProductName.create('AB');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at least 3 characters');
  });

  it('should cover line 14: return Result.fail with maxLength validation failure', () => {
    const longName = 'A'.repeat(51);
    const result = ProductName.create(longName);

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at most 50 characters');
  });

  it('should cover setProductName line 31: return Result.fail when guard validation fails', () => {
    const productName = ProductName.create('Original Name');
    expect(productName.isSuccess).toBe(true);

    const result = productName.value.setProductName('');

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should cover EXACT line 14 branch: notEmpty validation fails', () => {
    const result = ProductName.create('');
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should cover EXACT line 14 branch: minLength validation fails', () => {
    const result = ProductName.create('a');
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at least 3 characters');
  });

  it('should cover EXACT line 14 branch: maxLength validation fails', () => {
    const result = ProductName.create('A'.repeat(51));
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name must be at most 50 characters');
  });

  it('should cover EXACT line 14 branch: guard.isFailure is false (success path)', () => {
    const result = ProductName.create('Valid Name');
    expect(result.isSuccess).toBe(true);
    expect(result.value.getValue()).toBe('Valid Name');
  });

  it('should test each validation in DomainGuard.combine separately', () => {
    const emptyResult = ProductName.create('');
    expect(emptyResult.isFailure).toBe(true);
    expect(emptyResult.error).toBe('Product name should not be empty');

    const shortResult = ProductName.create('ab');
    expect(shortResult.isFailure).toBe(true);
    expect(shortResult.error).toBe(
      'Product name must be at least 3 characters'
    );

    const longResult = ProductName.create('A'.repeat(51));
    expect(longResult.isFailure).toBe(true);
    expect(longResult.error).toBe('Product name must be at most 50 characters');

    const validResult = ProductName.create('Valid Product Name');
    expect(validResult.isSuccess).toBe(true);
  });

  it('should test validation failure priority in DomainGuard.combine', () => {
    const result = ProductName.create('');
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product name should not be empty');
  });

  it('should cover line 14 FALSE branch: all validations pass', () => {
    const validNames = [
      'abc',
      'Valid Product',
      'Product Name 123',
      'A'.repeat(50),
      'A'.repeat(3),
    ];

    validNames.forEach((name) => {
      const result = ProductName.create(name);
      expect(result.isSuccess).toBe(true);
      expect(result.value.getValue()).toBe(name);
    });
  });

  it('should cover setProductName with all types of validation failures', () => {
    const productName = ProductName.create('Original Name');
    expect(productName.isSuccess).toBe(true);

    const emptyResult = productName.value.setProductName('');
    expect(emptyResult.isFailure).toBe(true);
    expect(emptyResult.error).toBe('Product name should not be empty');

    const shortResult = productName.value.setProductName('ab');
    expect(shortResult.isFailure).toBe(true);
    expect(shortResult.error).toBe(
      'Product name must be at least 3 characters'
    );

    const longResult = productName.value.setProductName('A'.repeat(51));
    expect(longResult.isFailure).toBe(true);
    expect(longResult.error).toBe('Product name must be at most 50 characters');

    const validResult = productName.value.setProductName('New Valid Name');
    expect(validResult.isSuccess).toBe(true);
    expect(validResult.value.getValue()).toBe('New Valid Name');
  });
});
