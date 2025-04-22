import { Order } from './domain/entities/order/order';
import { OrderItem } from './domain/entities/order/order-item';
import { Product } from './domain/entities/product/product';
import { ProductName } from './domain/entities/product/value-objects/product-name';
import { UniqueId } from './shared/domain/unique-id/unique-id';

console.time('Took');

const productName = ProductName.create('Livro');

const product = Product.create(productName.value, 'Introdução á linguagem Go');

const orderItem = OrderItem.create(new UniqueId(product.id.toString()), 100);
const order = Order.create(new UniqueId().toString(), [orderItem.value]);

console.log({
  product: product.ToJSON(),
  orderItem: orderItem.value,
  order: order.value,
});

console.timeEnd('Took');
