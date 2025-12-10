import PropTypes from 'prop-types';
import { ImageWithFallback } from '../fallImage/ImageWithFallback';
import { Badge } from '../ui/badge';
import { Trash2 } from 'lucide-react';

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
          {/* Image */}
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

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm mb-1 line-clamp-2 text-white">{item.name}</h3>

            <Badge
              className="text-xs mb-3 text-white"
              style={{
                background: '#111115',
              }}
            >
              {item.category}
            </Badge>

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
                <Trash2 className="h-5 w-5 fill-[#980707]" />
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
