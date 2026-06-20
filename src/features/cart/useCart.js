import { useState, useEffect, useCallback, useRef, startTransition } from 'react';
import { toast } from 'sonner';
import { addCartItem, normalizeCartItems, updateCartItemQuantity } from './cartModel.mjs';
import { loadCartItems, saveCartItems } from './cartStorage';

export function useCart(userId, authLoading, isAuthed, onRequireAuth) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const prevUserIdRef = useRef(null);

  // Sincronizar al cambiar de usuario (login/logout)
  useEffect(() => {
    if (authLoading) return;
    const prevUserId = prevUserIdRef.current;
    
    if (prevUserId !== userId) {
      if (prevUserId) {
        saveCartItems(prevUserId, cartItems);
      }
      if (userId) {
        const storedItems = loadCartItems(userId);
        startTransition(() => {
          setCartItems(normalizeCartItems(storedItems));
        });
      } else {
        startTransition(() => {
          setCartItems([]);
        });
      }
      prevUserIdRef.current = userId;
    }
  }, [userId, authLoading, cartItems]);

  // Guardar cambios del usuario actual
  useEffect(() => {
    saveCartItems(userId, cartItems);
  }, [cartItems, userId]);

  const handleAddToCart = useCallback((product, amount = 1) => {
    if (!isAuthed) {
      toast.error('Inicia sesión para agregar productos al carrito');
      if (onRequireAuth) onRequireAuth();
      return;
    }

    const quantityToAdd = Math.max(1, Number(amount) || 1);
    setCartItems((previousItems) => addCartItem(previousItems, product, quantityToAdd));
    toast.success('Carrito actualizado', {
      description:
        quantityToAdd === 1
          ? 'Se añadió una unidad del producto.'
          : `Se añadieron ${quantityToAdd} unidades del producto.`,
    });
  }, [isAuthed, onRequireAuth]);

  const handleUpdateCartQuantity = useCallback((id, quantity) => {
    setCartItems((previousItems) => updateCartItemQuantity(previousItems, id, quantity));
  }, []);

  const handleRemoveFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    handleAddToCart,
    handleUpdateCartQuantity,
    handleRemoveFromCart,
  };
}

