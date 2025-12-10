import { ShoppingCart, User, Menu, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { RubroSelector } from './RubroSelector';
import { Badge } from './ui/badge';
import { useRubro } from '../context/useRubro';
import { RUBROS } from '../context/rubroConstants';
import { Logo } from './smallComponents/Logo';
import { SearchInput } from './smallComponents/SearchInput';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { LOGOUT_USER } from '../graphql/mutations';
import { categories } from '../data/categories';
import { AnuncioHeader } from './smallComponents/AnuncioHeader';

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
}) {
  const { isSeller, rubro, setRubro, setIsSeller, setStore } = useRubro();
  const { data } = useQuery(GET_ME);
  const [logout] = useMutation(LOGOUT_USER);
  const client = useApolloClient();

  const isAuthed = !!data?.me;
  const user = data?.me;

  // Sync context with user data if needed
  useEffect(() => {
    if (user) {
      if (user.isSeller !== isSeller) setIsSeller(user.isSeller);
      if (user.rubro && user.rubro !== rubro) setRubro(user.rubro);
      if (user.storeName) setStore({ name: user.storeName, description: user.storeDescription });
    }
  }, [user, isSeller, rubro, setIsSeller, setRubro, setStore]);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const [headerConfig, setHeaderConfig] = useState(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    import('../services/strapi').then(({ getHeaderConfig }) => {
      getHeaderConfig().then((config) => {
        if (config) setHeaderConfig(config);
      });
    });
  }, []);

  const getColor = (key, fallback) => headerConfig?.[key] || fallback;

  useEffect(() => {
    const onDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const rubroShort = rubro === 'TECHNOLOGY' ? 'TEC' : rubro === 'GAMING' ? 'GAM' : '';

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-2xl font-sans"
      style={{
        backgroundColor: getColor('fondoHeaderColor', 'black'),
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
                <span style={{ color: getColor('logoText1Color', '#ffffff') }}>
                  {headerConfig?.logoText1 || 'Cargando...'}
                </span>
                <span style={{ color: getColor('logoText2Color', '#ffffff') }}>
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

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Rubro first, then wishlist, login, cart (order per reference) */}
            <RubroSelector titleColor={getColor('titleRubroColor', '#FFD700')} />
            <Button
              size="icon"
              className="relative text-[#E4D9AF] border-2 rounded-xl cursor-pointer"
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
              <Heart className="h-4 w-4" />
              {wishlistItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
                  style={{
                    background: '#FF6467',
                    boxShadow: '0 0 15px #FF6467',
                    color: 'black',
                  }}
                >
                  {wishlistItemsCount}
                </Badge>
              )}
            </Button>
            <div className="relative" ref={accountRef}>
              <Button
                size="icon"
                aria-label={
                  isSeller ? `Perfil vendedor rubro ${rubro}` : isAuthed ? 'Cuenta' : 'Login'
                }
                className="relative text-white border-2 rounded-xl cursor-pointer"
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
                  <User className="h-4 w-4" />
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
              </Button>
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
                  <button
                    className="w-full mt-1 text-left px-3 py-2 rounded-lg text-[#E4D9AF] cursor-pointer"
                    onClick={async () => {
                      await logout();
                      await client.resetStore();
                      // Reset rubro to TECHNOLOGY and disable behavior will follow automatically
                      setRubro(RUBROS.TECHNOLOGY);
                      setIsSeller(false);
                      setStore({ name: null, description: null });
                      setAccountOpen(false);
                    }}
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
            <Button
              size="icon"
              className="relative text-[#E4D9AF] border-2 rounded-xl cursor-pointer"
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
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
                  style={{
                    background: '#F38E00',
                    boxShadow: '0 0 15px #F38E00',
                    color: 'black',
                  }}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation - Estilo de la imagen */}
      <nav
        style={{
          backgroundColor: getColor('fondoNavColor', '#111115'),
        }}
      >
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 list-none">
            <li ref={categoriesRef} className="relative">
              <Button
                className="cursor-pointer gap-2 backdrop-blur-sm h-9 px-4"
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
                <Menu className="h-4 w-4" />
                Categorias
              </Button>
              {categoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[800px] rounded-xl p-6 z-50 animate-in fade-in slide-in-from-top-2"
                  style={{
                    backgroundColor: '#111115',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {categories.slice(0, 9).map((category, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg overflow-hidden transition-colors">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-[#E4D9AF] font-medium group-hover:text-[#F9B61D] transition-colors">
                            {category.name}
                          </h4>
                        </div>
                        {category.subcategories && (
                          <ul className="pl-[52px] space-y-1">
                            {category.subcategories.slice(0, 3).map((sub, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-xs text-[#FFFFFF] hover:text-[#F9B61D] transition-colors"
                              >
                                {sub.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#000000] text-center">
                    <Link
                      to="/#categories-section"
                      className="text-sm text-[#F9B61D] transition-colors inline-flex items-center gap-1"
                      onClick={() => {
                        setCategoriesOpen(false);
                        // Small timeout to allow dropdown to close before scrolling if needed,
                        // though native hash behavior might need help in some React setups.
                        // For now, simple hash link.
                        setTimeout(() => {
                          const el = document.getElementById('categories-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      Ver todas las categorías <Sparkles className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </li>
            {headerConfig?.menuItems
              ? headerConfig.menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={PATH_MAPPING[item.label] || item.url || '#'}
                      className="text-sm transition-colors"
                      style={{ color: getColor('enlacesNavColor', '#FFD700') }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = getColor('hoverEnlaceNav', '#FFD700'))
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = getColor('enlacesNavColor', '#FFD700'))
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))
              : 'Cargando...'}
            <div className="ml-auto">
              <button
                className="text-sm flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all cursor-pointer"
                style={{
                  color: getColor('titleNoticiasColor', '#FFD700'),
                  scale: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.scale = 1.3;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.scale = 1;
                }}
              >
                <Sparkles
                  className="h-4 w-4"
                  style={{
                    color: '#E4D9AF',
                    filter: 'drop-shadow(0 0 5px ' + '#E4D9AF' + ')',
                    rotate: '0deg',
                    animation: 'rotate 3s ease infinite',
                  }}
                />
                <span>{headerConfig?.titleNoticias || 'Cargando...'}</span>
              </button>
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
};
