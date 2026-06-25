import PropTypes from 'prop-types';

const copyByType = {
  cart: {
    icon: '🛒',
    title: 'Inicia sesión para usar tu carrito',
    description: 'Guarda productos, cantidades y continúa tu compra desde cualquier dispositivo.',
    action: 'Iniciar sesión y guardar carrito',
  },
  wishlist: {
    icon: '❤',
    title: 'Inicia sesión para guardar favoritos',
    description: 'Crea tu lista de deseos y vuelve a encontrar tus productos cuando quieras.',
    action: 'Iniciar sesión y guardar favoritos',
  },
};

export function AuthRequiredState({ type, onLoginClick }) {
  const copy = copyByType[type] || copyByType.cart;

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-5xl drop-shadow-[0_0_22px_rgba(249,182,29,0.35)]">
        {copy.icon}
      </div>
      <h3 className="mb-3 font-display text-2xl text-[#E4D9AF]">{copy.title}</h3>
      <p className="mb-8 max-w-xs text-sm leading-6 text-[#898989]">{copy.description}</p>
      <button
        type="button"
        onClick={onLoginClick}
        className="rounded-xl bg-[#F9B61D] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#ffd15a]"
      >
        {copy.action}
      </button>
    </div>
  );
}

AuthRequiredState.propTypes = {
  type: PropTypes.oneOf(['cart', 'wishlist']).isRequired,
  onLoginClick: PropTypes.func.isRequired,
};
