import PropTypes from 'prop-types';
import { CartIcon, TrashIcon } from '../icons/Icons';
import { SidebarProductItem } from './SidebarProductItem';

export function ItemsWishlist({ items, onRemoveItem, onAddToCart, onViewProduct }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <SidebarProductItem
          key={item.id}
          item={item}
          onViewProduct={onViewProduct}
          actions={
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 text-white text-xs scale-100 transition-all hover:scale-120 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToCart(item);
                }}
              >
                <CartIcon className="h-3 w-3 mr-1" />
                Añadir al Carrito
              </button>
              <button
                className="text-[#980707] h-8 px-3 cursor-pointer bg-transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveItem(item.id);
                }}
                aria-label={`Eliminar ${item.name} de favoritos`}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          }
        />
      ))}
    </div>
  );
}

ItemsWishlist.propTypes = {
  items: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onViewProduct: PropTypes.func.isRequired,
};
