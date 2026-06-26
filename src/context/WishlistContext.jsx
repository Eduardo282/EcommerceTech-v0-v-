import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useWishlist } from '../features/wishlist/useWishlist';
import { useAuth } from './useAuth';
import { WishlistContext } from './WishlistContextBase';

export function WishlistProvider({ children, productsContext = [] }) {
  const { authLoading, isAuthed, requireAuth, userId } = useAuth();
  const {
    handleToggleWishlist,
    isWishlistOpen,
    resolvedWishlistItems,
    setIsWishlistOpen,
    wishlistItems,
  } = useWishlist(userId, authLoading, isAuthed, requireAuth, productsContext);

  const value = useMemo(
    () => ({
      handleToggleWishlist,
      isWishlistOpen,
      resolvedWishlistItems,
      setIsWishlistOpen,
      wishlistItems,
      wishlistItemsCount: resolvedWishlistItems.length,
    }),
    [handleToggleWishlist, isWishlistOpen, resolvedWishlistItems, setIsWishlistOpen, wishlistItems]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
  productsContext: PropTypes.array,
};
