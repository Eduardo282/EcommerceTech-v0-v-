import PropTypes from 'prop-types';

export function SidebarShell({ ariaLabel, children, footer = null, header, isOpen, onClose }) {
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
        aria-label={ariaLabel}
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
          {header}
          <section className="flex-1 overflow-auto scrollbar-hide p-6">{children}</section>
          {footer}
        </div>
      </aside>
    </>
  );
}

SidebarShell.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  header: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
