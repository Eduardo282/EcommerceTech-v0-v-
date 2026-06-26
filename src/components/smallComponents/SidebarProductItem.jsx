import PropTypes from 'prop-types';
import { ImageWithFallback } from '../fallImage/ImageWithFallback';
import { formatCurrency } from '../../lib/formatCurrency';

export function SidebarProductItem({ actions, item, onViewProduct, priceMultiplier = 1 }) {
  const handleCardKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onViewProduct(item);
    }
  };

  const totalPrice = item.price * priceMultiplier;
  const totalOriginalPrice = item.originalPrice ? item.originalPrice * priceMultiplier : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewProduct(item)}
      onKeyDown={handleCardKeyDown}
      className="flex gap-4 p-4 rounded-xl transition-all group cursor-pointer hover:ring-1 hover:ring-[#F9B61D]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9B61D]"
      style={{
        background: '#2c2c30',
      }}
    >
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

      <div className="flex-1 min-w-0">
        <h3 className="text-sm mb-1 line-clamp-2 text-white">{item.name}</h3>

        <span
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent mb-3 text-white"
          style={{
            background: '#111115',
          }}
        >
          {item.category}
        </span>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg text-white">{formatCurrency(totalPrice)}</span>
          {totalOriginalPrice && (
            <span className="text-sm text-[#898989] line-through">
              {formatCurrency(totalOriginalPrice)}
            </span>
          )}
        </div>

        {actions}
      </div>
    </div>
  );
}

SidebarProductItem.propTypes = {
  actions: PropTypes.node.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    name: PropTypes.string,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onViewProduct: PropTypes.func.isRequired,
  priceMultiplier: PropTypes.number,
};
