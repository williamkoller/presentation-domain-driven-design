# Projeto de Exemplo com Arquitetura Baseada em DDD

Este projeto utiliza uma arquitetura baseada nos princípios do **Domain-Driven Design (DDD)**, com o objetivo de organizar o código de forma clara, escalável e de fácil manutenção. Abaixo, explicamos os principais conceitos e benefícios dessa abordagem.

## **Requisitos**

- **Node.js v22.12.0**: Certifique-se de ter o Node.js instalado em sua máquina. Você deve usar a mesma versão do projeto, veja a versão no arquivo `.nvmrc`.
---

## **Arquitetura**

A estrutura do projeto é organizada em camadas e conceitos principais do DDD:

- **Domain**: Contém as regras de negócio e entidades principais. Aqui estão as classes que representam o domínio, como `Order`, `OrderItem`, `Product` e seus respectivos **Value Objects** e **Domain Events**.
- **Application**: (não implementada no exemplo) Normalmente, contém os casos de uso e orquestração de regras de negócio.
- **Infrastructure**: (não implementada no exemplo) Responsável por lidar com detalhes técnicos, como persistência de dados, APIs externas, etc.
- **Shared**: Contém elementos reutilizáveis, como o `UniqueId`, que abstrai a geração de identificadores únicos.

---

## **Benefícios da Arquitetura**

1. **Clareza e Organização**:
    - Cada camada tem uma responsabilidade bem definida, facilitando a leitura e entendimento do código.
    - As regras de negócio estão isoladas no domínio, tornando-as independentes de detalhes técnicos.

2. **Escalabilidade**:
    - A separação de responsabilidades permite adicionar novas funcionalidades sem impactar outras partes do sistema.
    - Facilita a integração com novas tecnologias ou mudanças na infraestrutura.

3. **Reutilização de Código**:
    - Componentes como `Value Objects` e `Domain Events` podem ser reutilizados em diferentes partes do sistema.

4. **Facilidade de Testes**:
    - A lógica de negócio pode ser testada isoladamente, sem dependências externas.

5. **Redução de Tempo de Desenvolvimento**:
    - A organização clara reduz o tempo gasto para entender e modificar o código.
    - Novos desenvolvedores podem se integrar rapidamente ao projeto.

---

## **Gráfico da Arquitetura**

Abaixo está um gráfico inspirado no livro de DDD, representando a separação de responsabilidades:

```plaintext
+-----------------------+
|     Application       |  <- Orquestra os casos de uso, não implementado
+-----------------------+
           |
           v
+-----------------------+
|        Domain         |  <- Contém as regras de negócio
+-----------------------+
           |
           v
+-----------------------+
|     Infrastructure    |  <- Lida com detalhes técnicos, não implementado
+-----------------------+
```

## **Exemplo de Uso**

```bash
> presentation-domain-driven-design@1.0.0 start
> node --import=tsx src/main.ts

{
  product: {
    id: '9ad47002-a9f0-47c8-8643-129c8b74de4c',
    name: 'Livro',
    description: 'Introdução á linguagem Go'
  },
  orderItemOne: { productId: '9ad47002-a9f0-47c8-8643-129c8b74de4c', quantity: 100 },
  orderItemTwo: { productId: '9ad47002-a9f0-47c8-8643-129c8b74de4c', quantity: 200 },
  order: '{"id":"0648eb84-3e48-4974-9ac4-7b077f479f04","items":[{"productId":"9ad47002-a9f0-47c8-8643-129c8b74de4c","quantity":100},{"productId":"9ad47002-a9f0-47c8-8643-129c8b74de4c","quantity":200}]}',
  orderItemTotal: 300,
  orderCreatedEvent: [
    {
      eventName: 'OrderCreated',
      orderId: '0648eb84-3e48-4974-9ac4-7b077f479f04'
    }
  ]
}
Took: 1.667ms
```