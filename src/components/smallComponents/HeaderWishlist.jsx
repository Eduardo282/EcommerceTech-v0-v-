const Heart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
const X = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
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
