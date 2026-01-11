import PropTypes from 'prop-types';
import { ImageWithFallback } from '../fallImage/ImageWithFallback';

export function ItemsCarrito({ items, onRemoveItem }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 p-4 rounded-xl transition-all group"
          style={{
            background: '#2c2c30',
          }}
        >
          {/* Imagen del producto */}
          <div
            className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden"
            style={{
              background: 'transparent',
            }}
          >
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Detalles del producto */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm mb-1 line-clamp-2 text-white">{item.name}</h3>

            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-xs mb-3 text-white"
              style={{
                background: '#111115',
              }}
            >
              {item.category}
            </span>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-white">${Number(item.price).toFixed(2)}</span>
              {item.originalPrice && (
                <span className="text-sm text-[#898989] line-through">
                  ${Number(item.originalPrice).toFixed(2)}
                </span>
              )}
              <button
                className="text-[#000000] h-8 px-3 cursor-pointer bg-transparent"
                onClick={() => onRemoveItem(item.id)}
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
                  className="h-5 w-5 fill-[#980707]"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

ItemsCarrito.propTypes = {
  items: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
