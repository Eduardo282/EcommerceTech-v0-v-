import PropTypes from 'prop-types';
import { HeaderCarrito } from './smallComponents/HeaderCarrito';
import { HomeCarrito } from './smallComponents/HomeCarrito';
import { ItemsCarrito } from './smallComponents/ItemsCarrito';
import { SidebarShell } from './smallComponents/SidebarShell';
import { AuthRequiredState } from './AuthRequiredState';
import { toast } from 'sonner';
import { formatCurrency } from '../lib/formatCurrency';
import { getCartTotal } from '../features/cart/cartModel.mjs';

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onViewProduct,
  isAuthed,
  onLoginClick,
}) {
  const total = getCartTotal(items);
  const savings = items.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice ? (item.originalPrice - item.price) * (Number(item.quantity) || 1) : 0),
    0
  );

  const handleCheckout = async () => {
    try {
      // Llama a la API para crear una sesión de pago
      const response = await fetch(`/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la sesión de pago');
      }

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        toast.error('No se recibió la URL de pago.');
      }
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      toast.error(error.message || 'Hubo un problema al iniciar el pago.');
    }
  };

  const footer =
    isAuthed && items.length > 0 ? (
      <footer
        className="p-6 space-y-4"
        style={{
          boxShadow: '0 -5px 20px #2c2c30',
        }}
      >
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-[#E4D9AF]">Subtotal</span>
            <span className="text-white">{formatCurrency(total)}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#F9B61D]">Ahorros</span>
              <span className="text-[#F9B61D]" style={{ textShadow: '0 0 10px #F9B61D' }}>
                -{formatCurrency(savings)}
              </span>
            </div>
          )}
          <div
            className="flex justify-between text-lg pt-3 border-t-2"
            style={{ borderTopColor: '#2c2c30' }}
          >
            <span className="text-[#E4D9AF]">Total</span>
            <span className="text-white">{formatCurrency(total)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="flex items-center justify-center w-full text-white py-6 text-lg rounded-xl shadow-lg cursor-pointer hover:bg-white/10 transition-colors"
        >
          Proceder al pago
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
            className="ml-2 h-5 w-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        <p className="text-xs text-center text-[#898989] mt-4">🔒 Pago seguro</p>
      </footer>
    ) : null;

  return (
    <SidebarShell
      ariaLabel="shopping cart sidebar"
      footer={footer}
      header={<HeaderCarrito items={items} onClose={onClose} />}
      isOpen={isOpen}
      onClose={onClose}
    >
      {!isAuthed ? (
        <AuthRequiredState type="cart" onLoginClick={onLoginClick} />
      ) : items.length === 0 ? (
        <HomeCarrito onClose={onClose} />
      ) : (
        <ItemsCarrito
          items={items}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
          onViewProduct={onViewProduct}
        />
      )}
    </SidebarShell>
  );
}

CartSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      category: PropTypes.string,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onViewProduct: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};
