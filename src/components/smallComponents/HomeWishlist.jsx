import { Heart } from 'lucide-react';
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
        <Heart className="h-12 w-12 text-transparent fill-[#FF6467]" />
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
