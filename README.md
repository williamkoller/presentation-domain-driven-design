# 🏗️ Projeto Domain-Driven Design (DDD)

[![Node.js](https://img.shields.io/badge/Node.js-22.12.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-red.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

Um projeto de exemplo que demonstra a implementação de **Domain-Driven Design (DDD)** com TypeScript, focando em arquitetura limpa, escalabilidade e manutenibilidade.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Arquitetura](#arquitetura)
- [Conceitos DDD Implementados](#conceitos-ddd-implementados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Exemplos de Uso](#exemplos-de-uso)
- [Testes](#testes)
- [Apresentação](#apresentação)
- [Contribuição](#contribuição)
- [Recursos Adicionais](#recursos-adicionais)

## 🎯 Sobre o Projeto

Este projeto demonstra a implementação prática dos princípios do **Domain-Driven Design (DDD)** em TypeScript, criando uma arquitetura robusta e expressiva que coloca o domínio do negócio no centro do desenvolvimento.

### Objetivos:

- 🎨 **Código Expressivo**: Modelos que refletem fielmente o domínio do negócio
- 🔧 **Manutenibilidade**: Estrutura que facilita mudanças e evolução
- 🧪 **Testabilidade**: Lógica de negócio isolada e facilmente testável
- 📈 **Escalabilidade**: Arquitetura preparada para crescimento

## 🚀 Instalação e Execução

### Pré-requisitos

- **Node.js v22.12.0** (verifique no arquivo `.nvmrc`)
- **npm** ou **yarn**

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd presentation-domain-driven-design

# Instale as dependências
npm install
```

### Comandos Disponíveis

```bash
# Executar o projeto
npm start

# Executar testes
npm test

# Executar testes com cobertura
npm run test:cov

# Compilar TypeScript
npm run tsc
```

### Exemplo de Execução

```bash
$ npm start

> presentation-domain-driven-design@1.0.0 start
> node --import=tsx src/main.ts

{
  product: {
    id: '78705bff-58a7-4035-8fbc-7a45d56255d8',
    name: 'Livro',
    description: 'Introdução á linguagem Go'
  },
  orderItemOne: { productId: '78705bff-58a7-4035-8fbc-7a45d56255d8', quantity: 100 },
  orderItemTwo: { productId: '78705bff-58a7-4035-8fbc-7a45d56255d8', quantity: 200 },
  order: {
    id: 'ce350a63-98a5-42fe-bde7-1e61c83d4cde',
    items: [
      { productId: '78705bff-58a7-4035-8fbc-7a45d56255d8', quantity: 100 },
      { productId: '78705bff-58a7-4035-8fbc-7a45d56255d8', quantity: 200 }
    ]
  },
  orderItemTotal: 300,
  orderCreatedEvent: [
    { eventName: 'OrderCreated', orderId: 'ce350a63-98a5-42fe-bde7-1e61c83d4cde' }
  ],
  productEvent: [
    { eventName: 'ProductCreated', productId: '78705bff-58a7-4035-8fbc-7a45d56255d8' }
  ]
}
Took: 1.667ms
```

## 🏛️ Arquitetura

O projeto implementa uma arquitetura em camadas baseada nos princípios do DDD:

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│                  (Casos de Uso - Futuro)                   │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                            │
│  • Entities (Order, Product, OrderItem)                    │
│  • Value Objects (ProductName)                             │
│  • Aggregate Roots                                         │
│  • Domain Events (OrderCreated, ProductCreated)            │
│  • Domain Services (OrderItemTotalService)                 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                       │
│                (Persistência - Futuro)                     │
└─────────────────────────────────────────────────────────────┘
```

### Benefícios da Arquitetura:

| Aspecto              | Benefício                              |
| -------------------- | -------------------------------------- |
| **Expressividade**   | Código que fala a linguagem do negócio |
| **Manutenibilidade** | Mudanças isoladas no domínio           |
| **Testabilidade**    | Lógica de negócio independente         |
| **Escalabilidade**   | Fácil adição de novas funcionalidades  |

## 🧩 Conceitos DDD Implementados

### 1. **Entities (Entidades)**

Objetos com identidade única e ciclo de vida próprio.

```typescript
// Order.ts - Aggregate Root
export class Order extends AggregateRoot<OrderItem> {
  public static create(id: string, items: OrderItem[]): Result<Order> {
    // Validações de domínio
    const guard = DomainGuard.combine([
      DomainGuard.notEmpty(id, 'order-id'),
      DomainGuard.isInRange(items.length, 1, 50, 'order-items'),
    ]);

    if (guard.isFailure) return Result.fail(guard.error!);

    const order = new Order(id, items);
    order.registerOrderCreatedEvent(); // Emite Domain Event

    return Result.ok(order);
  }
}
```

### 2. **Value Objects**

Objetos imutáveis que representam conceitos do domínio.

```typescript
// ProductName.ts
export class ProductName {
  public static create(name: string): Result<ProductName> {
    if (!name || name.trim().length === 0) {
      return Result.fail('Product name cannot be empty');
    }
    return Result.ok(new ProductName(name.trim()));
  }
}
```

### 3. **Aggregate Root**

Ponto de entrada para um conjunto de entidades relacionadas.

```typescript
// AggregateRoot.ts
export abstract class AggregateRoot<T> {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }
}
```

### 4. **Domain Events**

Representam eventos importantes que ocorrem no domínio.

```typescript
// OrderCreatedEvent.ts
export class OrderCreatedEvent extends DomainEvent {
  constructor(private readonly orderId: string) {
    super('OrderCreated');
  }

  public getOrderId(): string {
    return this.orderId;
  }
}
```

### 5. **Domain Services**

Operações que não pertencem naturalmente a uma entidade específica.

```typescript
// OrderItemTotalService.ts
export class OrderItemTotalService {
  public static calculateTotalQuantity(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.getQuantity(), 0);
  }
}
```

### 6. **Result Pattern**

Tratamento seguro de erros sem exceções.

```typescript
// Result.ts
export class Result<T> {
  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error, null);
  }
}
```

## 📁 Estrutura do Projeto

```
src/
├── core/                          # 🔧 Building Blocks do DDD
│   ├── aggregate-root.ts          # Base para Aggregate Roots
│   ├── domain-event.ts            # Base para Domain Events
│   ├── domain-guard.ts            # Validações de domínio
│   └── result.ts                  # Pattern para tratamento de erros
├── domain/                        # 🏢 Camada de Domínio
│   ├── entities/                  # Entidades do negócio
│   │   ├── order/                 # 📦 Agregado Order
│   │   │   ├── order.ts           # Aggregate Root
│   │   │   ├── order-item.ts      # Entity
│   │   │   └── *.spec.ts          # Testes
│   │   └── product/               # 🛍️ Agregado Product
│   │       ├── product.ts         # Aggregate Root
│   │       ├── value-objects/     # Value Objects
│   │       └── *.spec.ts          # Testes
│   ├── events/                    # 📢 Domain Events
│   │   ├── order/                 # Eventos do Order
│   │   └── product/               # Eventos do Product
│   └── services/                  # 🔧 Domain Services
│       └── order/                 # Services do Order
├── shared/                        # 🔄 Elementos Compartilhados
│   └── domain/
│       ├── identifier/            # Identificadores abstratos
│       └── unique-id/             # Geração de IDs únicos
└── main.ts                        # 🚀 Demonstração do uso
```

## 💡 Exemplos de Uso

### Criando um Produto

```typescript
// 1. Criar um nome de produto (Value Object)
const productName = ProductName.create('Livro de TypeScript');
if (productName.isFailure) {
  console.error(productName.error);
  return;
}

// 2. Criar o produto
const product = Product.create(
  productName.value,
  'Guia completo de TypeScript'
);
```

### Criando um Pedido

```typescript
// 1. Criar itens do pedido
const orderItem1 = OrderItem.create(
  new UniqueId(product.value.id.toString()),
  2
);

const orderItem2 = OrderItem.create(
  new UniqueId(product.value.id.toString()),
  3
);

// 2. Criar o pedido (Aggregate Root)
const order = Order.create(new UniqueId().toString(), [
  orderItem1.value,
  orderItem2.value,
]);

// 3. Verificar eventos emitidos
console.log('Domain Events:', order.value.domainEvents);
// Output: [{ eventName: 'OrderCreated', orderId: '...' }]
```

### Usando Domain Services

```typescript
// Calcular total de itens usando Domain Service
const totalQuantity = OrderItemTotalService.calculateTotalQuantity(
  order.value.getItems()
);

console.log('Total de itens:', totalQuantity); // Output: 5
```

## 🧪 Testes

O projeto possui uma suíte completa de testes unitários para todos os conceitos implementados.

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm run test:cov

# Executar testes específicos
npm test -- --testNamePattern="Order"
```

### Cobertura de Testes

O projeto mantém alta cobertura de testes para garantir a qualidade:

- **Entities**: Testes de criação, validação e comportamentos
- **Value Objects**: Testes de imutabilidade e validações
- **Domain Services**: Testes de lógica de negócio
- **Domain Events**: Testes de emissão e estrutura

### Exemplo de Teste

```typescript
// order.spec.ts
describe('Order', () => {
  it('should create a valid order', () => {
    const orderItems = [
      /* ... */
    ];
    const result = Order.create('order-id', orderItems);

    expect(result.isSuccess).toBe(true);
    expect(result.value.domainEvents).toHaveLength(1);
    expect(result.value.domainEvents[0].eventName).toBe('OrderCreated');
  });
});
```

## 📊 Apresentação

Para uma compreensão completa dos conceitos e benefícios do DDD implementados neste projeto, consulte nossa apresentação detalhada:

📖 **[Apresentação DDD - Arquitetura e Importância](./apresentacao-ddd-arquitetura.md)**

A apresentação inclui:

- Conceitos fundamentais do DDD
- Comparações práticas (com e sem DDD)
- Benefícios mensuráveis
- Roadmap de evolução
- Quando usar DDD

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### Diretrizes:

- Mantenha os testes atualizados
- Siga os padrões de código existentes
- Documente novas funcionalidades
- Mantenha a cobertura de testes alta

## 🔮 Próximos Passos

### Roadmap de Evolução:

#### Fase 1: Fundação ✅

- [x] Core building blocks (AggregateRoot, DomainEvent, Result)
- [x] Entidades básicas (Order, Product, OrderItem)
- [x] Value Objects (ProductName)
- [x] Domain Services (OrderItemTotalService)
- [x] Domain Events (OrderCreated, ProductCreated)

#### Fase 2: Application Layer 🔄

- [ ] Use Cases para operações principais
- [ ] Command/Query handlers
- [ ] Application Services
- [ ] DTOs para comunicação entre camadas

#### Fase 3: Infrastructure 📋

- [ ] Repositórios com persistência real
- [ ] Event Bus para Domain Events
- [ ] Configuração de banco de dados
- [ ] APIs REST/GraphQL

#### Fase 4: Observabilidade 📊

- [ ] Logging estruturado
- [ ] Métricas de negócio
- [ ] Tracing distribuído
- [ ] Health checks

## 📚 Recursos Adicionais

### Livros Recomendados:

- **"Domain-Driven Design"** - Eric Evans
- **"Implementing Domain-Driven Design"** - Vaughn Vernon
- **"Clean Architecture"** - Robert C. Martin

### Links Úteis:

- [Martin Fowler - DDD](https://martinfowler.com/tags/domain%20driven%20design.html)
- [Microsoft - DDD Guide](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/)

### Ferramentas:

- **Event Storming** para descoberta do domínio
- **Context Mapping** para definir bounded contexts
- **Aggregate Designer** para modelagem visual

---

**Desenvolvido com ❤️ usando Domain-Driven Design**

_Este projeto demonstra como o DDD pode transformar a forma como desenvolvemos software, criando sistemas mais expressivos, maintíveis e alinhados com o negócio._
