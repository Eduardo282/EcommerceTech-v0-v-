import PropTypes from 'prop-types';

import { HeaderWishlist } from './smallComponents/HeaderWishlist';
import { HomeWishlist } from './smallComponents/HomeWishlist';
import { ItemsWishlist } from './smallComponents/ItemsWishlist';
import { SidebarShell } from './smallComponents/SidebarShell';
import { AuthRequiredState } from './AuthRequiredState';
import { CartIcon } from './icons/Icons';

export function WishlistSidebar({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
  onViewProduct,
  isAuthed,
  onLoginClick,
}) {
  const footer =
    isAuthed && items.length > 0 ? (
      <footer
        className="p-6 space-y-4"
        style={{
          boxShadow: '0 -5px 20px #2c2c30',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#E4D9AF]">Total Artículos:</span>
          <span className="text-xl text-white font-display">{items.length}</span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 text-[#898989] bg-transparent cursor-pointer" onClick={onClose}>
            Continuar Comprando
          </button>
          <button
            className="flex items-center gap-2 text-white cursor-pointer scale-100 transition-all hover:scale-115"
            onClick={() => {
              items.forEach((item) => onAddToCart(item));
            }}
          >
            <CartIcon className="h-4 w-4 mr-2 text-white" />
            Añadir Todo al Carrito
          </button>
        </div>
      </footer>
    ) : null;

  return (
    <SidebarShell
      ariaLabel="Wishlist"
      footer={footer}
      header={<HeaderWishlist items={items} onClose={onClose} />}
      isOpen={isOpen}
      onClose={onClose}
    >
      {!isAuthed ? (
        <AuthRequiredState type="wishlist" onLoginClick={onLoginClick} />
      ) : items.length === 0 ? (
        <HomeWishlist onClose={onClose} />
      ) : (
        <ItemsWishlist
          items={items}
          onRemoveItem={onRemoveItem}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
        />
      )}
    </SidebarShell>
  );
}

WishlistSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewProduct: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};
