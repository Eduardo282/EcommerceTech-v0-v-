import { ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { HeaderCarrito } from './smallComponents/HeaderCarrito';
import { HomeCarrito } from './smallComponents/HomeCarrito';
import { ItemsCarrito } from './smallComponents/ItemsCarrito';
import { toast } from 'sonner';

export function CartSidebar({ isOpen, onClose, items, onRemoveItem }) {
  // Asegurar que todas las operaciones numéricas usen números (manejar precios como cadenas de la API)
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const savings = items.reduce(
    (sum, item) =>
      sum + (item.originalPrice ? Number(item.originalPrice || 0) - Number(item.price || 0) : 0),
    0
  );

  const handleCheckout = async () => {
    try {
      // Llama a la API para crear una sesión de pago
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items }),
        }
      );

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

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: '#111115',
          boxShadow: '0 0 30px #2c2c30',
        }}
        aria-label="shopping cart sidebar"
      >
        <div
          className="absolute inset-0 opacity-15"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, #F9B61D40 1px, transparent 1px),
              linear-gradient(to bottom, #F9B61D40 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          <HeaderCarrito items={items} onClose={onClose} />

          <section className="flex-1 overflow-auto scrollbar-hide p-6">
            {items.length === 0 ? (
              <HomeCarrito onClose={onClose} />
            ) : (
              <ItemsCarrito items={items} onRemoveItem={onRemoveItem} />
            )}
          </section>

          {items.length > 0 && (
            <footer
              className="p-6 space-y-4"
              style={{
                boxShadow: '0 -5px 20px #2c2c30',
              }}
            >
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#E4D9AF]">Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#F9B61D]">Ahorros</span>
                    <span className="text-[#F9B61D]" style={{ textShadow: '0 0 10px #F9B61D' }}>
                      -${savings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div
                  className="flex justify-between text-lg pt-3 border-t-2"
                  style={{ borderTopColor: '#2c2c30' }}
                >
                  <span className="text-[#E4D9AF]">Total</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="flex items-center justify-center w-full text-white py-6 text-lg rounded-xl shadow-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                Proceder al pago
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <p className="text-xs text-center text-[#898989] mt-4">🔒 Pago seguro</p>
            </footer>
          )}
        </div>
      </aside>
    </>
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
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
