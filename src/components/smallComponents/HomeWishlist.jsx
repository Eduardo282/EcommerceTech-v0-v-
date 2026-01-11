import PropTypes from 'prop-types';

export function HomeWishlist({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div
        className="p-6 rounded-full mb-4"
        style={{
          filter: 'drop-shadow(0 0 30px #FF6467)',
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
          className="h-12 w-12 text-transparent fill-[#FF6467]"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>
      <h3 className="text-xl mb-2 text-[#E4D9AF] font-display">Tu lista de deseos está vacía</h3>
      <p className="text-[#898989] mb-6">¡Empieza a agregar productos que te encanten!</p>
      <button
        onClick={onClose}
        className="text-white cursor-pointer scale-100 transition-all hover:scale-110"
      >
        Seguir Explorando
      </button>
    </div>
  );
}

HomeWishlist.propTypes = {
  onClose: PropTypes.func.isRequired,
};
