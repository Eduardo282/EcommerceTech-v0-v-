import assert from 'node:assert/strict';
import { hasProductId, sameProductId } from './productIdentity.js';

assert.equal(sameProductId(8, '8'), true);
assert.equal(sameProductId('book-1', 'book-1'), true);
assert.equal(hasProductId([1, 'book-2'], '1'), true);
assert.equal(hasProductId([1, 'book-2'], 'book-1'), false);

console.log('productIdentity checks passed');
