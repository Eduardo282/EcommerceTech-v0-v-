import PropTypes from 'prop-types';

export function HeaderCarrito({ items, onClose }) {
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
            className="scale-150 h-5 w-5 text-[#F38E00]"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <div>
          <h2
            className="text-xl text-[#E4D9AF] font-display"
            style={{
              textShadow: '0 0 15px rgba(234, 179, 8, 0.45)',
            }}
          >
            Carrito
          </h2>
          <p className="text-sm text-white">
            {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{
          background: '#111115',
        }}
      >
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
          className="h-5 w-5 text-[#E4D9AF]"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </header>
  );
}

HeaderCarrito.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
