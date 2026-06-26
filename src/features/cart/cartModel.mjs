const MAX_CART_QUANTITY = 99;

function normalizeQuantity(quantity) {
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(Number(quantity) || 1)));
}

function normalizePrice(price) {
  return Math.max(0, Number(price) || 0);
}

function normalizePriceFields(item) {
  return {
    ...item,
    originalPrice:
      item.originalPrice == null ? item.originalPrice : normalizePrice(item.originalPrice),
    price: normalizePrice(item.price),
  };
}

export function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];

  return items.reduce((normalized, item) => {
    if (!item?.id) return normalized;

    const quantity = normalizeQuantity(item.quantity);
    const existing = normalized.find((candidate) => candidate.id === item.id);

    if (!existing) return [...normalized, { ...normalizePriceFields(item), quantity }];

    existing.quantity = normalizeQuantity(existing.quantity + quantity);
    return normalized;
  }, []);
}

export function addCartItem(items, product, amount = 1) {
  const quantityToAdd = normalizeQuantity(amount);
  const existingItem = items.find((item) => item.id === product.id);

  const normalizedProduct = normalizePriceFields(product);

  if (!existingItem) return [...items, { ...normalizedProduct, quantity: quantityToAdd }];

  return items.map((item) =>
    item.id === product.id
      ? { ...item, quantity: normalizeQuantity((Number(item.quantity) || 1) + quantityToAdd) }
      : item
  );
}

export function updateCartItemQuantity(items, id, quantity) {
  const nextQuantity = Number(quantity);
  if (nextQuantity <= 0) return items.filter((item) => item.id !== id);

  return items.map((item) =>
    item.id === id ? { ...item, quantity: normalizeQuantity(nextQuantity) } : item
  );
}

export function getCartTotal(items) {
  return items.reduce(
    (total, item) => total + normalizePrice(item.price) * normalizeQuantity(item.quantity),
    0
  );
}
