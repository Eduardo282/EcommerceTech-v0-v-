export function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];

  return items.reduce((normalized, item) => {
    if (!item?.id) return normalized;

    const quantity = Math.max(1, Number(item.quantity) || 1);
    const existing = normalized.find((candidate) => candidate.id === item.id);

    if (!existing) return [...normalized, { ...item, quantity }];

    existing.quantity += quantity;
    return normalized;
  }, []);
}

export function addCartItem(items, product, amount = 1) {
  const quantityToAdd = Math.max(1, Number(amount) || 1);
  const existingItem = items.find((item) => item.id === product.id);

  if (!existingItem) return [...items, { ...product, quantity: quantityToAdd }];

  return items.map((item) =>
    item.id === product.id
      ? { ...item, quantity: (Number(item.quantity) || 1) + quantityToAdd }
      : item
  );
}

export function updateCartItemQuantity(items, id, quantity) {
  const nextQuantity = Number(quantity);
  if (nextQuantity <= 0) return items.filter((item) => item.id !== id);

  return items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));
}

export function getCartTotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.price || 0) * (Number(item.quantity) || 1),
    0
  );
}
