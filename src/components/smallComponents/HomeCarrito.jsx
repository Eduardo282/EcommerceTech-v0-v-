import { ShoppingBag } from 'lucide-react';
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
        <ShoppingBag className="h-12 w-12 text-[#F38E00]" />
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
