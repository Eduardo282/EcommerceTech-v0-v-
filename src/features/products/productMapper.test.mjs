import assert from 'node:assert/strict';
import { mapProduct } from './productMapper.js';

const mapped = mapProduct({
  id: 123,
  title: 'Test product',
  originalPrice: 19.999,
  descuentoPrice: 9.995,
  category: { name: 'Testing' },
  images: ['image-a.png', 'image-a.png', ''],
});

assert.equal(mapped.id, '123');
assert.equal(mapped.price, 9.99);
assert.equal(mapped.originalPrice, 20);
assert.equal(typeof mapped.price, 'number');
assert.deepEqual(mapped.images, ['image-a.png']);
assert.equal(mapped.badge, 'Oferta');

const fallback = mapProduct({ id: 'fallback', title: 'Fallback', originalPrice: undefined });
assert.equal(fallback.price, 0);
assert.equal(fallback.originalPrice, null);
assert.equal(fallback.category, 'General');
