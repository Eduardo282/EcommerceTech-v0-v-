import assert from 'node:assert/strict';
import {
  addCartItem,
  getCartTotal,
  normalizeCartItems,
  updateCartItemQuantity,
} from './cartModel.mjs';

const repeated = normalizeCartItems([
  { id: 'p1', price: 10, quantity: 1 },
  { id: 'p1', price: 10, quantity: 2 },
]);
assert.equal(repeated.length, 1);
assert.equal(repeated[0].quantity, 3);

const cart = addCartItem([], { id: 'p2', price: 15 }, 2);
assert.equal(cart[0].quantity, 2);
assert.equal(getCartTotal(cart), 30);
assert.equal(updateCartItemQuantity(cart, 'p2', 0).length, 0);

assert.deepEqual(normalizeCartItems(null), []);
assert.equal(getCartTotal([]), 0);
assert.equal(getCartTotal([{ id: 'p3', price: -100, quantity: 2 }]), 0);
assert.equal(
  addCartItem([{ id: 'p4', price: 1, quantity: 98 }], { id: 'p4', price: 1 }, 10)[0].quantity,
  99
);
assert.equal(updateCartItemQuantity(cart, 'p2', 1000)[0].quantity, 99);
