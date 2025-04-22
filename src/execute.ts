import { Product } from './domain/entities/product/product';

console.time('Took');

const product = Product.create('Livro', 'Introdução á linguagem Go');

console.log(product.ToJSON());

console.timeEnd('Took');
