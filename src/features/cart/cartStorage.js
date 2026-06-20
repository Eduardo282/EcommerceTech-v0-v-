export function loadCartItems(userId) {
  if (!userId) return [];

  try {
    return JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
  } catch {
    localStorage.removeItem(`cart_${userId}`);
    return [];
  }
}

export function saveCartItems(userId, cartItems) {
  if (userId) localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
}
