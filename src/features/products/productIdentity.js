export function sameProductId(left, right) {
  return String(left) === String(right);
}

export function hasProductId(productIds, productId) {
  return productIds.some((id) => sameProductId(id, productId));
}
