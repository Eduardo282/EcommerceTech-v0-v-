import { useContext } from 'react';
import { WishlistContext } from './WishlistContextBase';

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within WishlistProvider');
  }
  return context;
}
