import PropTypes from 'prop-types';
import { ShoppingCart } from 'lucide-react';
import { HeaderWishlist } from './smallComponents/HeaderWishlist';
import { HomeWishlist } from './smallComponents/HomeWishlist';
import { ItemsWishlist } from './smallComponents/ItemsWishlist';

export function WishlistSidebar({ isOpen, onClose, items, onRemoveItem, onAddToCart }) {
  return (
    <>
      {/* Cubierta */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Barra lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] shadow-2xl z-999 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Wishlist"
        style={{
          background: '#111115',
          boxShadow: '-5px 0 38px #2c2c30',
        }}
      >
        {/* Patrón de cuadrícula */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #F9B61D40 1px, transparent 1px),
              linear-gradient(to bottom, #F9B61D40 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <HeaderWishlist items={items} onClose={onClose} />

          {/* Items */}
          <section className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {items.length === 0 ? (
              <HomeWishlist onClose={onClose} />
            ) : (
              <ItemsWishlist items={items} onRemoveItem={onRemoveItem} onAddToCart={onAddToCart} />
            )}
          </section>

          {/* Footer - Solo se muestra si hay artículos */}
          {items.length > 0 && (
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
                <button
                  className="flex-1 text-[#898989] bg-transparent cursor-pointer"
                  onClick={onClose}
                >
                  Continuar Comprando
                </button>
                <button
                  className="flex items-center gap-2 text-white cursor-pointer scale-100 transition-all hover:scale-115"
                  onClick={() => {
                    items.forEach((item) => onAddToCart(item));
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2 text-white" />
                  Añadir Todo al Carrito
                </button>
              </div>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}

WishlistSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
