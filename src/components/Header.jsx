import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RubroSelector } from './RubroSelector';
import { Logo } from './smallComponents/Logo';
import { SearchInput } from './smallComponents/SearchInput';
import { AnuncioHeader } from './smallComponents/AnuncioHeader';
import { ThemeToggle } from './ThemeToggle';
import { useHeader } from './useHeader';

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
}) {
  const {
    accountOpen,
    accountRef,
    categoriesOpen,
    categoriesRef,
    getColor,
    headerConfig,
    isAuthed,
    isSeller,
    logoutUser,
    rubro,
    rubroShort,
    setAccountOpen,
    setCategoriesOpen,
    user,
  } = useHeader();

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-2xl font-sans"
      style={{
        backgroundColor: getColor('fondoHeaderColor', '#fff'),
        boxShadow: '0 4px 32px #2C2C30',
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

          <SearchInput />

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Rubro primero, luego wishlist, login, carrito (orden por referencia) */}
            <RubroSelector titleColor={getColor('titleRubroColor', '#fff')} />
            <button
              className="relative flex items-center justify-center w-10 h-10 text-[#E4D9AF] border-2 rounded-xl cursor-pointer"
              onClick={onWishlistClick}
              style={{
                background: 'transparent',
                borderColor: '#2c2c30',
                boxShadow: '0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px #111115 inset, 0 0 24px #111115';
                e.currentTarget.style.borderColor = '#111115';
                e.currentTarget.style.color = '#FF6467';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30';
                e.currentTarget.style.borderColor = '#2c2c30';
                e.currentTarget.style.color = '#E4D9AF';
              }}
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
                className="h-4 w-4"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {wishlistItemsCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse text-xs font-bold rounded-full"
                  style={{
                    background: '#FF6467',
                    boxShadow: '0 0 15px #FF6467',
                    color: 'black',
                  }}
                >
                  {wishlistItemsCount}
                </span>
              )}
            </button>
            <div className="relative" ref={accountRef}>
              <button
                aria-label={
                  isSeller ? `Perfil vendedor rubro ${rubro}` : isAuthed ? 'Cuenta' : 'Login'
                }
                className="relative h-10 flex items-center justify-center text-white border-2 rounded-xl cursor-pointer"
                style={{
                  background: 'transparent',
                  borderColor: '#2c2c30',
                  boxShadow: '0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30',
                  padding: '0 45px',
                }}
                onClick={() => {
                  if (isAuthed) setAccountOpen((o) => !o);
                  else onUserClick?.();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px #111115 inset, 0 0 24px #111115';
                  e.currentTarget.style.borderColor = '#111115';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30';
                  e.currentTarget.style.borderColor = '#2c2c30';
                }}
              >
                <div className="flex items-center gap-1 px-1">
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
                    className="h-4 w-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-[#E4D9AF] text-xs md:inline-block">
                    {isAuthed ? 'Cuenta' : 'Login'}
                  </span>
                </div>
                {isSeller && (
                  <span
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide"
                    style={{
                      color: rubro === 'GAMING' ? '#fff' : '#fff',
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
                    className="w-full text-left px-3 py-2 rounded-lg text-[#E4D9AF] cursor-pointer"
                    onClick={() => setAccountOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'inset 0 1.5px 1px 2px #2c2c30';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1.5px 1px 2px #2c2c30';
                    }}
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
                    className="w-full mt-1 text-left px-3 py-2 rounded-lg text-[#E4D9AF] cursor-pointer"
                    onClick={logoutUser}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'inset 0 1.5px 1px 2px #2c2c30';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1.5px 1px 2px #2c2c30';
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
            <button
              className="relative flex items-center justify-center w-10 h-10 text-[#E4D9AF] border-2 rounded-xl cursor-pointer"
              onClick={onCartClick}
              style={{
                background: 'transparent',
                borderColor: '#2c2c30',
                boxShadow: '0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px #111115 inset, 0 0 24px #111115';
                e.currentTarget.style.borderColor = '#111115';
                e.currentTarget.style.color = '#F38E00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30';
                e.currentTarget.style.borderColor = '#2c2c30';
                e.currentTarget.style.color = '#E4D9AF';
              }}
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
                className="h-4 w-4"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {cartItemsCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse text-xs font-bold rounded-full"
                  style={{
                    background: '#F38E00',
                    boxShadow: '0 0 15px #F38E00',
                    color: 'black',
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </button>
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
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer gap-2 backdrop-blur-sm h-9 px-4"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                style={{
                  background: 'none',
                  color: '#E4D9AF',
                  boxShadow: categoriesOpen ? '0 0 15px #E4D9AF' : '0 0 5px #E4D9AF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px ' + '#E4D9AF';
                  e.currentTarget.style.background = 'none';
                }}
                onMouseLeave={(e) => {
                  if (!categoriesOpen) {
                    e.currentTarget.style.boxShadow = '0 0 5px ' + '#E4D9AF';
                  }
                  e.currentTarget.style.background = 'none';
                }}
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
                  className="h-4 w-4"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                Categorias
              </button>
              {categoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[520px] max-w-[calc(100vw-2rem)] rounded-xl p-5 z-50 animate-in fade-in slide-in-from-top-2"
                  style={{
                    backgroundColor: '#111115',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(228, 217, 175, 0.16)',
                    boxShadow: '0 18px 48px rgba(0, 0, 0, 0.45)',
                  }}
                >
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#E4D9AF]">
                      Categorías de productos
                    </p>
                    <p className="mt-1 text-xs text-white/55">
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
                            <p className="truncate text-sm font-medium text-[#E4D9AF]">
                              {category.name}
                            </p>
                            <p className="text-xs text-white/50">
                              {category.productCount}{' '}
                              {category.productCount === 1 ? 'producto' : 'productos'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg border border-white/10 px-4 py-5 text-center text-sm text-white/55">
                      No hay categorías disponibles.
                    </p>
                  )}
                </div>
              )}
            </li>
            {headerConfig?.menuItems
              ? headerConfig.menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={PATH_MAPPING[item.label] || item.url || '#'}
                      className="text-sm transition-colors"
                      style={{ color: getColor('enlacesNavColor', '#fff') }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = getColor('hoverEnlaceNav', '#fff'))
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = getColor('enlacesNavColor', '#fff'))
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              : 'Cargando...'}
            <div className="ml-auto">
              <Link
                to="/nuevos-lanzamientos"
                className="text-sm flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all cursor-pointer"
                style={{
                  color: getColor('titleNoticiasColor', '#fff'),
                  scale: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.scale = 1.3;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.scale = 1;
                }}
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
                  className="h-4 w-4"
                  style={{
                    color: '#E4D9AF',
                    filter: 'drop-shadow(0 0 5px ' + '#E4D9AF' + ')',
                    rotate: '0deg',
                    animation: 'rotate 3s ease infinite',
                  }}
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
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
};
