import PropTypes from 'prop-types';

export function HomeCarrito({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div
        className="p-6 rounded-full mb-4"
        style={{
          filter: 'drop-shadow(0 0 30px #F38E00)',
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
          className="h-12 w-12 text-[#F38E00]"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      <h3 className="text-xl mb-2 text-[#E4D9AF] font-display">Tu carrito está vacío</h3>
      <p className="text-[#898989] mb-6">Agrega productos para comenzar</p>
      <button
        onClick={onClose}
        className="text-white cursor-pointer scale-100 transition-all hover:scale-110"
      >
        Seguir comprando
      </button>
    </div>
  );
}

HomeCarrito.propTypes = {
  onClose: PropTypes.func.isRequired,
};
