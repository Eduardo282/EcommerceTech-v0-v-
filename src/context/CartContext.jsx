import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../features/cart/useCart';
import { CartContext } from './CartContextBase';
import { useAuth } from './useAuth';

export function CartProvider({ children }) {
  const { authLoading, isAuthed, requireAuth, userId } = useAuth();
  const {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateCartQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart(userId, authLoading, isAuthed, requireAuth);

  const cartItemsCount = useMemo(
    () => cartItems.reduce((total, item) => total + (Number(item.quantity) || 1), 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartItemsCount,
      handleAddToCart,
      handleRemoveFromCart,
      handleUpdateCartQuantity,
      isCartOpen,
      setIsCartOpen,
    }),
    [
      cartItems,
      cartItemsCount,
      handleAddToCart,
      handleRemoveFromCart,
      handleUpdateCartQuantity,
      isCartOpen,
      setIsCartOpen,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
