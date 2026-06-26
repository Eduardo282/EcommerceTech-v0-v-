import PropTypes from 'prop-types';
import { CloseIcon } from '../icons/Icons';

export function SidebarHeader({ icon, onClose, subtitle, title }) {
  return (
    <header
      className="flex items-center justify-between p-6"
      style={{
        background: '#F9B61D40',
        boxShadow: '0 2px 20px #F9B61D40',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg">{icon}</div>
        <div>
          <h2
            className="text-xl text-[#E4D9AF] font-display"
            style={{
              textShadow: '0 0 15px rgba(234, 179, 8, 0.45)',
            }}
          >
            {title}
          </h2>
          <p className="text-sm text-white">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{
          background: '#111115',
        }}
        aria-label={`Cerrar ${title}`}
      >
        <CloseIcon className="h-5 w-5 text-[#E4D9AF]" />
      </button>
    </header>
  );
}

SidebarHeader.propTypes = {
  icon: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
