import { Order } from './domain/entities/order/order';
import { OrderItem } from './domain/entities/order/order-item';
import { Product } from './domain/entities/product/product';
import { ProductName } from './domain/entities/product/value-objects/product-name';
import { OrderCreatedEvent } from './domain/events/order/order-created-event';
import { ProductCreatedEvent } from './domain/events/product/product-created-event';
import { OrderItemTotalService } from './domain/services/order/order-item-total.service';
import { UniqueId } from './shared/domain/unique-id/unique-id';

console.time('Took');

const productName = ProductName.create('Livro');

const product = Product.create(productName.value, 'Introdução á linguagem Go');

const orderItemOneResult = OrderItem.create(
  new UniqueId(product.value.id.toString()),
  100
);
const orderItemTwoResult = OrderItem.create(
  new UniqueId(product.value.id.toString()),
  200
);

if (orderItemOneResult.isFailure || orderItemTwoResult.isFailure) {
  throw new Error('Failed to create order items');
}

const orderItemOne = orderItemOneResult.value;
const orderItemTwo = orderItemTwoResult.value;

const order = Order.create(new UniqueId().toString(), [
  orderItemOne,
  orderItemTwo,
]);
const orderQuantity = OrderItemTotalService.calculateTotalQuantity(
  order.value.getItems()
);

console.dir(
  {
    product: product.value.toJSON(),
    orderItemOne: orderItemOne.toJSON(),
    orderItemTwo: orderItemTwo.toJSON(),
    order: order.value.toJSON(),
    orderItemTotal: orderQuantity,
    orderCreatedEvent: order.value.domainEvents.map((e) => ({
      eventName: e.eventName,
      orderId: (e as OrderCreatedEvent).getOrderId(),
    })),
    productEvent: product.value.domainEvents.map((e) => ({
      eventName: e.eventName,
      productId: (e as ProductCreatedEvent).getProductId(),
    })),
  },
  { depth: null }
);

console.timeEnd('Took');
