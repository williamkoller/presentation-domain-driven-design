import { AggregateRoot } from './aggregate-root';
import { DomainEvent } from './domain-event';

class TestEvent implements DomainEvent {
  public readonly occurredAt: Date;
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
    this.occurredAt = new Date();
  }
  eventName: string;
}

class TestAggregate extends AggregateRoot<string> {
  constructor(id: string) {
    super(id);
  }

  public triggerEvent(event: DomainEvent) {
    this.addDomainEvent(event);
  }
}

describe('AggregateRoot', () => {
  it('should store the id passed in constructor', () => {
    const aggregate = new TestAggregate('abc-123');
    expect(aggregate.id).toBe('abc-123');
  });

  it('should add domain event', () => {
    const aggregate = new TestAggregate('test-1');
    const event = new TestEvent('EventCreated');

    aggregate.triggerEvent(event);

    expect(aggregate.domainEvents.length).toBe(1);
    expect(aggregate.domainEvents[0]).toBe(event);
  });

  it('should clear domain events', () => {
    const aggregate = new TestAggregate('test-2');
    const event = new TestEvent('EventToClear');

    aggregate.triggerEvent(event);
    expect(aggregate.domainEvents.length).toBe(1);

    aggregate.clearEvents();
    expect(aggregate.domainEvents.length).toBe(0);
  });
});
