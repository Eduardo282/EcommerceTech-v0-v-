import PropTypes from 'prop-types';
import { ShoppingBagIcon } from '../icons/Icons';
import { SidebarHeader } from './SidebarHeader';

export function HeaderCarrito({ items, onClose }) {
  const totalItems = items.reduce((total, item) => total + (Number(item.quantity) || 1), 0);

  return (
    <SidebarHeader
      icon={<ShoppingBagIcon className="scale-150 h-5 w-5 text-[#F38E00]" />}
      onClose={onClose}
      title="Carrito"
      subtitle={`${totalItems} ${totalItems === 1 ? 'artículo' : 'artículos'}`}
    />
  );
}

HeaderCarrito.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
