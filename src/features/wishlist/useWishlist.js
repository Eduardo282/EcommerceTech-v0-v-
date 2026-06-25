import { useState, useEffect, useCallback, useRef, startTransition, useMemo } from 'react';
import { toast } from 'sonner';

function getWishlistStorageKey(userId) {
  return `wishlist_catalog_${userId}`;
}

export function useWishlist(userId, authLoading, isAuthed, onRequireAuth, productsContext = []) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCatalog, setWishlistCatalog] = useState({});
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const prevUserIdRef = useRef(null);
  const wishlistItemsRef = useRef(wishlistItems);
  const wishlistCatalogRef = useRef(wishlistCatalog);

  useEffect(() => {
    wishlistItemsRef.current = wishlistItems;
  }, [wishlistItems]);

  useEffect(() => {
    wishlistCatalogRef.current = wishlistCatalog;
  }, [wishlistCatalog]);

  // Sincronizar wishlist al cambiar de usuario (login/logout)
  useEffect(() => {
    if (authLoading) return;
    const prevUserId = prevUserIdRef.current;
    
    if (prevUserId !== userId) {
      if (prevUserId) {
        localStorage.setItem(`wishlist_${prevUserId}`, JSON.stringify(wishlistItemsRef.current));
        localStorage.setItem(getWishlistStorageKey(prevUserId), JSON.stringify(wishlistCatalogRef.current));
      }
      if (userId) {
        startTransition(() => {
          setWishlistItems(JSON.parse(localStorage.getItem(`wishlist_${userId}`) || '[]'));
          setWishlistCatalog(JSON.parse(localStorage.getItem(getWishlistStorageKey(userId)) || '{}'));
        });
      } else {
        startTransition(() => {
          setWishlistItems([]);
          setWishlistCatalog({});
        });
      }
      prevUserIdRef.current = userId;
    }
  }, [userId, authLoading]);

  // Persistir cambios
  useEffect(() => {
    if (userId) localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlistItems));
  }, [wishlistItems, userId]);

  useEffect(() => {
    if (userId) localStorage.setItem(getWishlistStorageKey(userId), JSON.stringify(wishlistCatalog));
  }, [wishlistCatalog, userId]);

  // Resolver productos combinando catálogo persistente con nuevos del contexto
  const resolvedWishlistItems = useMemo(() => {
    const lookup = new Map();

    productsContext.forEach((product) => {
      lookup.set(String(product.id), product);
    });

    Object.entries(wishlistCatalog).forEach(([id, product]) => {
      if (product) lookup.set(id, product);
    });

    const seen = new Set();

    return wishlistItems.reduce((items, id) => {
      const key = String(id);
      if (seen.has(key)) return items;

      const product = lookup.get(key);
      if (!product) return items;

      seen.add(key);
      items.push(product);
      return items;
    }, []);
  }, [productsContext, wishlistCatalog, wishlistItems]);

  const handleToggleWishlist = useCallback((productOrId) => {
    if (!isAuthed) {
      if (onRequireAuth) {
        onRequireAuth('wishlist');
      } else {
        toast.info('Inicia sesión para guardar tu lista de deseos');
      }
      return;
    }
    const product = typeof productOrId === 'object' && productOrId !== null ? productOrId : null;
    const productId = product?.id ?? productOrId;
    const productKey = String(productId);

    if (wishlistItems.includes(productId)) {
      setWishlistItems((prev) => prev.filter((id) => id !== productId));
      setWishlistCatalog((prev) => {
        const next = { ...prev };
        delete next[productKey];
        return next;
      });
      toast.success('Removido de favoritos', { description: 'Producto removido de sus favoritos' });
    } else {
      setWishlistItems((prev) => [...prev, productId]);
      if (product) {
        setWishlistCatalog((prev) => ({ ...prev, [productKey]: product }));
      }
      toast.success('Añadido a favoritos', { description: 'Producto añadido a sus favoritos' });
    }
  }, [wishlistItems, isAuthed, onRequireAuth]);

  return {
    wishlistItems,
    resolvedWishlistItems,
    isWishlistOpen,
    setIsWishlistOpen,
    handleToggleWishlist,
  };
}
