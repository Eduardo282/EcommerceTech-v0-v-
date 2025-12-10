import { Heart, X } from 'lucide-react';
import PropTypes from 'prop-types';

export function HeaderWishlist({ items, onClose }) {
  return (
    <header
      className="flex items-center justify-between p-6"
      style={{
        background: '#F9B61D40',
        boxShadow: '0 2px 20px #F9B61D40',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg">
          <Heart className="scale-150 h-5 w-5 text-transparent fill-[#FF6467]" />
        </div>
        <div>
          <h2
            className="text-xl text-[#E4D9AF] font-display"
            style={{
              textShadow: '0 0 15px rgba(234, 179, 8, 0.45)',
            }}
          >
            Mi Lista de Deseos
          </h2>
          <p className="text-sm text-white">
            {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-full transition-all hover:scale-110"
        style={{
          background: '#111115',
        }}
      >
        <X className="h-5 w-5 text-[#E4D9AF] cursor-pointer" />
      </button>
    </header>
  );
}

HeaderWishlist.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
