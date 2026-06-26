import PropTypes from 'prop-types';
import { HeartIcon } from '../icons/Icons';
import { SidebarHeader } from './SidebarHeader';

export function HeaderWishlist({ items, onClose }) {
  return (
    <SidebarHeader
      icon={<HeartIcon className="scale-150 h-5 w-5 text-[#FF6467] fill-[#FF6467]" />}
      onClose={onClose}
      title="Mi Lista de Deseos"
      subtitle={`${items.length} ${items.length === 1 ? 'artículo' : 'artículos'}`}
    />
  );
}

HeaderWishlist.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
