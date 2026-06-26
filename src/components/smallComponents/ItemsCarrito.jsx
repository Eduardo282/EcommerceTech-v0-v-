import PropTypes from 'prop-types';
import { TrashIcon } from '../icons/Icons';
import { SidebarProductItem } from './SidebarProductItem';

export function ItemsCarrito({ items, onRemoveItem, onUpdateQuantity, onViewProduct }) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const quantity = item.quantity || 1;

        return (
          <SidebarProductItem
            key={item.id}
            item={item}
            onViewProduct={onViewProduct}
            priceMultiplier={quantity}
            actions={
              <div className="flex items-center justify-between gap-3">
                <div
                  className="inline-flex items-center overflow-hidden rounded-lg border border-white/10"
                  aria-label={`Cantidad de ${item.name}`}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onUpdateQuantity(item.id, quantity - 1);
                    }}
                    className="h-8 w-9 cursor-pointer text-[#E4D9AF] transition-colors hover:bg-white/10"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                  >
                    −
                  </button>
                  <span className="min-w-9 text-center text-sm font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onUpdateQuantity(item.id, quantity + 1);
                    }}
                    className="h-8 w-9 cursor-pointer text-[#E4D9AF] transition-colors hover:bg-white/10"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="h-8 cursor-pointer bg-transparent px-3 text-[#980707]"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveItem(item.id);
                  }}
                  aria-label={`Eliminar ${item.name} del carrito`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            }
          />
        );
      })}
    </div>
  );
}

ItemsCarrito.propTypes = {
  items: PropTypes.array.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onViewProduct: PropTypes.func.isRequired,
};
