import { UniqueId } from './unique-id';

describe(UniqueId.name, () => {
  it('should generate a valid UUID if no id is passed', () => {
    const id = new UniqueId();
    const value = id.toValue();

    expect(typeof value).toBe('string');
    expect(value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it('should use the provided string id if passed', () => {
    const id = new UniqueId('custom-id-123');
    expect(id.toValue()).toBe('custom-id-123');
  });

  it('should use the provided numeric id if passed', () => {
    const id = new UniqueId(12345);
    expect(id.toValue()).toBe(12345);
  });

  it('should return the same value for toString and toValue (string)', () => {
    const id = new UniqueId('abc-123');
    expect(id.toString()).toBe('abc-123');
    expect(id.toValue()).toBe('abc-123');
  });

  it('should return the same value for toString and toValue (number)', () => {
    const id = new UniqueId(9876);
    expect(id.toString()).toBe('9876');
    expect(id.toValue()).toBe(9876);
  });

  it('should compare two UniqueId instances with same value as equal', () => {
    const id1 = new UniqueId('same-id');
    const id2 = new UniqueId('same-id');
    expect(id1.equals(id2)).toBe(true);
  });

  it('should compare two UniqueId instances with different values as not equal', () => {
    const id1 = new UniqueId('id-1');
    const id2 = new UniqueId('id-2');
    expect(id1.equals(id2)).toBe(false);
  });
});
