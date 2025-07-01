import { DomainEvent } from '../../../core/domain-event';

/**
 * Evento de domínio que representa a criação de um pedido (`Order`).
 *
 * No Domain-Driven Design (DDD), eventos de domínio são usados para sinalizar que algo importante ocorreu dentro do domínio,
 * permitindo que outras partes do sistema reajam de forma desacoplada.
 *
 * O `OrderCreatedEvent` é emitido quando um novo pedido é criado com sucesso, permitindo que listeners ou handlers possam executar ações como:
 * - Enviar e-mail de confirmação
 * - Atualizar relatórios
 * - Disparar integração com sistemas externos
 *
 * Propriedades:
 * - `occurredAt`: Data e hora em que o evento foi disparado.
 * - `eventName`: Nome do evento (útil para roteamento ou logs).
 * - `orderId`: Identificador do pedido associado ao evento.
 *
 * Métodos:
 * - `getOrderId()`: Retorna o ID do pedido.
 * - `toJSON()`: Retorna o evento como objeto serializável (útil para logs, mensageria, persistência, etc).
 */
export class OrderCreatedEvent implements DomainEvent {
  public readonly occurredAt: Date;
  public readonly eventName: string;

  constructor(public readonly orderId: string) {
    this.occurredAt = new Date();
    this.eventName = 'OrderCreated';
  }

  public getOrderId(): string {
    return this.orderId;
  }

  public toJSON(): object {
    return {
      orderId: this.getOrderId(),
      occurredAt: this.occurredAt,
      eventName: this.eventName,
    };
  }
}
