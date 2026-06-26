import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RubroSelector } from './RubroSelector';
import { Logo } from './smallComponents/Logo';
import { SearchInput } from './smallComponents/SearchInput';
import { AnuncioHeader } from './smallComponents/AnuncioHeader';
import { ThemeToggle } from './ThemeToggle';
import { useHeader } from '../hooks/useHeader';
import { CartIcon, GridIcon, HeartIcon, SparkleIcon, UserIcon } from './icons/Icons';

const PATH_MAPPING = {
  'Plantillas dashboard': '/plantillas-dashboard',
  'Plantillas Auth': '/plantillas-auth',
  'Componentes de UI/UX': '/componentes-ui-ux',
  'Libros de programacion': '/libros-programacion',
  'Guias de estudio': '/guias-estudio',
  Controladores: '/controladores',
};

export function Header({
  onCartClick,
  cartItemsCount,
  onWishlistClick,
  wishlistItemsCount,
  onUserClick,
  productCategories = [],
  searchCatalogItems = [],
}) {
  const {
    accountOpen,
    accountRef,
    categoriesOpen,
    categoriesRef,
    getColor,
    headerConfig,
    isAuthed,
    isDark,
    isSeller,
    logoutUser,
    rubro,
    rubroShort,
    setAccountOpen,
    setCategoriesOpen,
    user,
  } = useHeader();
  const headerIconColor = isDark ? '#E4D9AF' : '#111827';
  const headerButtonBorder = isDark ? '#2c2c30' : '#d1d5db';
  const headerButtonHover = isDark ? '#111115' : '#f3f4f6';
  const headerPanelBackground = isDark ? '#111115' : '#ffffff';
  const headerPanelBorder = isDark ? 'rgba(228, 217, 175, 0.16)' : 'rgba(15, 23, 42, 0.12)';
  const headerPanelMuted = isDark ? 'rgba(255, 255, 255, 0.55)' : '#64748b';

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-2xl font-sans"
      style={{
        backgroundColor: getColor('fondoHeaderColor', '#fff'),
        boxShadow: isDark ? '0 4px 32px #2C2C30' : '0 4px 24px rgba(15, 23, 42, 0.08)',
      }}
    >
      <AnuncioHeader headerConfig={headerConfig} getColor={getColor} />

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo />
            <div>
              <h1 className="text-xl transition-all flex items-center font-display">
                <span style={{ color: getColor('logoText1Color', '#fff') }}>
                  {headerConfig?.logoText1 || 'Cargando...'}
                </span>
                <span style={{ color: getColor('logoText2Color', '#fff') }}>
                  {headerConfig?.logoText2 || 'Cargando...'}
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse shadow-lg"
                  style={{
                    boxShadow: '0 0 10px ' + '#F9B61D',
                    background: '#F9B61D',
                  }}
                />
              </h1>
            </div>
          </Link>

          <SearchInput catalogItems={searchCatalogItems} />

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Rubro primero, luego wishlist, login, carrito (orden por referencia) */}
            <RubroSelector titleColor={getColor('titleRubroColor', '#fff')} />
            <HeaderIconButton
              badgeColor="#FF6467"
              borderColor={headerButtonBorder}
              count={wishlistItemsCount}
              hoverColor="#FF6467"
              hoverBorderColor={headerButtonHover}
              onClick={onWishlistClick}
              textColor={headerIconColor}
            >
              <HeartIcon />
            </HeaderIconButton>
            <div className="relative" ref={accountRef}>
              <button
                aria-label={
                  isSeller
                    ? `Perfil vendedor rubro ${rubro}`
                    : isAuthed
                      ? 'Cuenta'
                      : 'Inicia Sesion'
                }
                className="relative h-10 flex items-center justify-center border-2 rounded-xl cursor-pointer border-[var(--header-button-border)] text-[var(--header-icon-color)] shadow-[0_0_0_1px_var(--header-button-border)_inset,0_0_16px_var(--header-button-border)] transition-all hover:border-[var(--header-button-hover)] hover:shadow-[0_0_0_1px_var(--header-button-hover)_inset,0_0_24px_var(--header-button-hover)]"
                style={{
                  '--header-button-border': headerButtonBorder,
                  '--header-button-hover': headerButtonHover,
                  '--header-icon-color': headerIconColor,
                  background: 'transparent',
                  padding: '0 45px',
                }}
                onClick={() => {
                  if (isAuthed) setAccountOpen((o) => !o);
                  else onUserClick?.();
                }}
              >
                <div className="flex items-center gap-1 px-1">
                  <UserIcon className="h-4 w-4" />
                  <span className="text-xs md:inline-block" style={{ color: headerIconColor }}>
                    {isAuthed ? 'Cuenta' : 'Inicia Sesion'}
                  </span>
                </div>
                {isSeller && (
                  <span
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide"
                    style={{
                      color: '#fff',
                    }}
                  >
                    {rubroShort}
                  </span>
                )}
              </button>
              {isAuthed && accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 min-w-[180px] rounded-xl p-2 z-50"
                  style={{
                    background: 'transparent',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg text-[#E4D9AF] cursor-pointer shadow-[0_1.5px_1px_2px_#2c2c30] hover:shadow-[inset_0_1.5px_1px_2px_#2c2c30]"
                    onClick={() => setAccountOpen(false)}
                  >
                    Perfil
                  </button>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/products"
                      className="block w-full mt-1 px-3 py-2 rounded-lg text-[#F9B61D]"
                      onClick={() => setAccountOpen(false)}
                    >
                      Administrar productos
                    </Link>
                  )}
                  <button
                    className="w-full mt-1 text-left px-3 py-2 rounded-lg text-[#E4D9AF] cursor-pointer shadow-[0_1.5px_1px_2px_#2c2c30] hover:shadow-[inset_0_1.5px_1px_2px_#2c2c30]"
                    onClick={logoutUser}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
            <HeaderIconButton
              badgeColor="#F38E00"
              borderColor={headerButtonBorder}
              count={cartItemsCount}
              hoverColor="#F38E00"
              hoverBorderColor={headerButtonHover}
              onClick={onCartClick}
              textColor={headerIconColor}
            >
              <CartIcon />
            </HeaderIconButton>
          </div>
        </div>
      </div>

      {/* Navigation - Estilo de la imagen */}
      <nav
        style={{
          backgroundColor: getColor('fondoNavColor', '#fff'),
        }}
      >
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 list-none">
            <li ref={categoriesRef} className="relative">
              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium text-[var(--category-shadow)] transition-shadow cursor-pointer gap-2 backdrop-blur-sm h-9 px-4 hover:shadow-[0_0_15px_var(--category-shadow)] ${
                  categoriesOpen
                    ? 'shadow-[0_0_15px_var(--category-shadow)]'
                    : 'shadow-[0_0_5px_var(--category-shadow)]'
                }`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                style={{
                  '--category-shadow': headerIconColor,
                  background: 'none',
                }}
              >
                <GridIcon className="h-4 w-4" />
                Categorias
              </button>
              {categoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[520px] max-w-[calc(100vw-2rem)] rounded-xl p-5 z-50 animate-in fade-in slide-in-from-top-2"
                  style={{
                    backgroundColor: headerPanelBackground,
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${headerPanelBorder}`,
                    boxShadow: isDark
                      ? '0 18px 48px rgba(0, 0, 0, 0.45)'
                      : '0 18px 48px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  <div className="mb-4">
                    <p className="text-sm font-semibold" style={{ color: headerIconColor }}>
                      Categorías de productos
                    </p>
                    <p className="mt-1 text-xs" style={{ color: headerPanelMuted }}>
                      Esta lista se actualiza automáticamente con el catálogo.
                    </p>
                  </div>

                  {productCategories.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {productCategories.map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-3 transition-colors hover:border-[#F9B61D]/60 hover:bg-white/5"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F9B61D]/15 text-sm font-bold text-[#F9B61D]">
                            {category.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-medium"
                              style={{ color: headerIconColor }}
                            >
                              {category.name}
                            </p>
                            <p className="text-xs" style={{ color: headerPanelMuted }}>
                              {category.productCount}{' '}
                              {category.productCount === 1 ? 'producto' : 'productos'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="rounded-lg px-4 py-5 text-center text-sm"
                      style={{ border: `1px solid ${headerPanelBorder}`, color: headerPanelMuted }}
                    >
                      No hay categorías disponibles.
                    </p>
                  )}
                </div>
              )}
            </li>
            {headerConfig?.menuItems
              ? headerConfig.menuItems.map((item) => (
                  <li key={item.id || item.label || item.url}>
                    <Link
                      to={PATH_MAPPING[item.label] || item.url || '#'}
                      className="text-sm text-[var(--nav-link-color)] transition-colors hover:text-[var(--nav-link-hover)]"
                      style={{
                        '--nav-link-color': getColor('enlacesNavColor', '#fff'),
                        '--nav-link-hover': getColor('hoverEnlaceNav', '#fff'),
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              : 'Cargando...'}
            <div className="ml-auto">
              <Link
                to="/nuevos-lanzamientos"
                className="text-sm flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all cursor-pointer hover:scale-[1.3]"
                style={{
                  color: getColor('titleNoticiasColor', '#fff'),
                }}
              >
                <SparkleIcon
                  className="h-4 w-4 animate-pulse"
                  style={{
                    color: headerIconColor,
                    filter: `drop-shadow(0 0 5px ${headerIconColor})`,
                  }}
                />
                <span>{headerConfig?.titleNoticias || 'Cargando...'}</span>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  onCartClick: PropTypes.func,
  cartItemsCount: PropTypes.number,
  onWishlistClick: PropTypes.func,
  wishlistItemsCount: PropTypes.number,
  onUserClick: PropTypes.func,
  productCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      productCount: PropTypes.number.isRequired,
    })
  ),
  searchCatalogItems: PropTypes.array,
};

function HeaderIconButton({
  badgeColor,
  borderColor = '#2c2c30',
  children,
  count,
  hoverBorderColor = '#111115',
  hoverColor,
  onClick,
  textColor = '#E4D9AF',
}) {
  return (
    <button
      className="relative flex items-center justify-center w-10 h-10 border-2 rounded-xl cursor-pointer border-[var(--button-border)] text-[var(--button-text)] shadow-[0_0_0_1px_var(--button-border)_inset,0_0_16px_var(--button-border)] transition-all hover:border-[var(--button-hover-border)] hover:text-[var(--button-hover-color)] hover:shadow-[0_0_0_1px_var(--button-hover-border)_inset,0_0_24px_var(--button-hover-border)]"
      onClick={onClick}
      style={{
        '--button-border': borderColor,
        '--button-hover-border': hoverBorderColor,
        '--button-hover-color': hoverColor,
        '--button-text': textColor,
        background: 'transparent',
      }}
    >
      {children}
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse text-xs font-bold rounded-full"
          style={{ background: badgeColor, boxShadow: `0 0 15px ${badgeColor}`, color: 'black' }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

HeaderIconButton.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  hoverBorderColor: PropTypes.string,
  hoverColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  textColor: PropTypes.string,
};
