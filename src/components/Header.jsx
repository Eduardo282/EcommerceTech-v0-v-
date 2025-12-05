import {
  ShoppingCart,
  User,
  Menu,
  Heart,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { RubroSelector } from "./RubroSelector";
import { Badge } from "./ui/badge";
import { useRubro, RUBROS } from "../context/RubroContext";
import { Logo } from "./smallComponents/Logo";
import { SearchInput } from "./smallComponents/SearchInput";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { LOGOUT_USER } from "../graphql/mutations";
import { categories } from "../data/categories";

const PATH_MAPPING = {
  "Plantillas dashboard": "/plantillas-dashboard",
  "Plantillas Auth": "/plantillas-auth",
  "Componentes de UI/UX": "/componentes-ui-ux",
  "Libros de programacion": "/libros-programacion",
  "Guias de estudio": "/guias-estudio",
  "Controladores": "/controladores",
};

export function Header({
  onCartClick,
  cartItemsCount,
  onWishlistClick,
  wishlistItemsCount,
  onUserClick,
}) {
  const { isSeller, rubro, setRubro, setIsSeller, setStore } = useRubro();
  const { data, loading, refetch } = useQuery(GET_ME);
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
  }, [user]);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const [headerConfig, setHeaderConfig] = useState(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  useEffect(() => {
    import('../services/strapi').then(({ getHeaderConfig }) => {
      getHeaderConfig().then(config => {
        if (config) setHeaderConfig(config);
      });
    });
  }, []);

  const getColor = (key, fallback) => headerConfig?.[key] || fallback;


  useEffect(() => {
    const handler = () => {
       refetch();
    };
    // We can still use this event or just rely on refetchQueries in AuthModal if we did that.
    // But AuthModal removed the dispatch. 
    // Actually, AuthModal calls onSuccess. We should pass a handler to AuthModal if it's rendered here?
    // Wait, AuthModal is NOT rendered in Header. It is likely rendered in App.jsx or similar?
    // Let's check where AuthModal is used. 
    // If AuthModal is global, we might need a way to trigger refetch.
    // For now, let's keep the event listener but we need to dispatch it from somewhere if we want this to work,
    // OR we rely on Apollo Cache updates.
    // Since AuthModal uses the same client, if it updates the cache or refetches, this query should update automatically.
    // So we might not need this useEffect at all if we handle it correctly in AuthModal.
    // But let's leave a simple refetch trigger if needed.
  }, []);
  useEffect(() => {
    const onDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);
  const rubroShort =
    rubro === "TECHNOLOGY" ? "TEC" : rubro === "GAMING" ? "GAM" : "";
  return (
    <header
      className="sticky top-0 z-50 w-full shadow-2xl font-sans"
      style={{
        backgroundColor: getColor("fondoHeaderColor", "black"),
        boxShadow: "0 4px 32px #2F2F33",
      }}>
      {/* Top Bar AD */}
      {(() => {
        const isActive = headerConfig?.mostrarAnuncio ?? true;
        if (!isActive) return null;

        const now = new Date();
        const start = headerConfig?.fechaInicioAnuncio ? new Date(headerConfig.fechaInicioAnuncio) : null;
        const end = headerConfig?.fechaFinAnuncio ? new Date(headerConfig.fechaFinAnuncio) : null;

        if (start && now < start) return null;
        if (end && now > end) return null;

        return (
          <section
            className="relative overflow-hidden"
            style={{
              background: getColor("fondoAnuncioColor", "linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)"),
            }}
            aria-label="site announcement">
            <div className="absolute inset-0 animate-shimmer"></div>
            <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm relative z-10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <Sparkles
                    className="h-4 w-4 animate-pulse text-[#F9B61D]"
                    style={{
                      filter: "drop-shadow(0 0 5px #F9B61D)",
                    }}
                  />
                  <span
                    style={{
                      textShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                      color: getColor("titleAnuncioColor", "#FFD700")
                    }}>
                    {headerConfig?.titleAnuncio || "Cargando..."}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="hover:text-amber-300 transition-colors cursor-pointer" style={{ color: getColor("enlacesAnuncioColor", "rgba(253, 230, 138, 0.7)") }}>
                  Ayuda & Soporte
                </button>
                <button className="hover:text-amber-300 transition-colors cursor-pointer" style={{ color: getColor("enlacesAnuncioColor", "rgba(253, 230, 138, 0.7)") }}>
                  Rastrear Pedido
                </button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo />
            <div>
              <h1
                className="text-xl tracking-tight transition-all flex items-center gap-2 font-display"
                style={{
                  color: getColor("logoText1Color", "#ffffff"),
                }}>
                <span 
                style={{ color: getColor("logoText1Color", "#ffffff") }}>
                  {headerConfig?.logoText1 || "Cargando..."}
                </span> 
                <span style={{ color: getColor("logoText2Color", "#ffffff") }}>
                  {headerConfig?.logoText2 || "Cargando..."}
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse shadow-lg"
                  style={{
                    boxShadow: "0 0 10px " + "#F9B61D",
                    background: "#F9B61D",
                  }}
                />
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="h-px w-6" style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0%,  #F9B61D 50%, rgba(0,0,0,0) 100%)',
                }} />
                <p
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    textShadow: "0 0 10px " + "#FFD700",
                    color: getColor("descripcionLogoColor", "#FFD700"),
                  }}>
                  Tienda Digital
                </p>
                <div className="h-px w-6" style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0%,  #F9B61D 50%, rgba(0,0,0,0) 100%)',
                }} />
              </div>
            </div>
          </Link>

       <SearchInput/>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Rubro first, then wishlist, login, cart (order per reference) */}
            <RubroSelector titleColor={getColor("titleRubroColor", "#FFD700")} />
            <Button
              size="icon"
              className="relative text-[#E4D9AF] border-2 rounded-xl cursor-pointer"
              onClick={onWishlistClick}
              style={{
                background: "transparent",
                borderColor: "#2c2c30",
                boxShadow: "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px #111115 inset, 0 0 24px #111115";
                e.currentTarget.style.borderColor = "#111115";
                e.currentTarget.style.color = "#FF6467";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30";
                e.currentTarget.style.borderColor = "#2c2c30";
                e.currentTarget.style.color = "#E4D9AF";
              }}>
              <Heart className="h-4 w-4" />
              {wishlistItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
                  style={{
                    background: "#FF6467",
                    boxShadow: "0 0 15px #FF6467",
                    color: "black",
                  }}>
                  {wishlistItemsCount}
                </Badge>
              )}
            </Button>
            <div className="relative" ref={accountRef}>
              <Button
                size="icon"
                aria-label={
                  isSeller
                    ? `Perfil vendedor rubro ${rubro}`
                    : isAuthed
                    ? "Cuenta"
                    : "Login"
                }
                className="relative text-white border-2 rounded-xl cursor-pointer"
                style={{
                  background: "transparent",
                  borderColor: "#2c2c30",
                  boxShadow: "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30",
                  padding: "0 45px",
                }}
                onClick={() => {
                  if (isAuthed) setAccountOpen((o) => !o);
                  else onUserClick?.();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 0 1px #111115 inset, 0 0 24px #111115";
                  e.currentTarget.style.borderColor = "#111115";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30";
                  e.currentTarget.style.borderColor = "#2c2c30";
                }}>
                <div className="flex items-center gap-1 px-1">
                  <User className="h-4 w-4" />
                  <span className="text-[#E4D9AF] text-xs md:inline-block">
                    {isAuthed ? "Cuenta" : "Login"}
                  </span>
                </div>
                {isSeller && (
                  <span
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide"
                    style={{
                      color: rubro === "GAMING" ? "#fff" : "#fff",
                    }}>
                    {rubroShort}
                  </span>
                )}
              </Button>
              {isAuthed && accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 min-w-[180px] rounded-xl p-2 z-50"
                  style={{
                    background: "transparent",
                    backdropFilter: "blur(10px)",
                  }}>
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg text-[#E4D9AF] cursor-pointer"
                    onClick={() => setAccountOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "inset 0 1.5px 1px 2px #2c2c30";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 1.5px 1px 2px #2c2c30";
                    }}>
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
                      e.currentTarget.style.boxShadow =
                        "inset 0 1.5px 1px 2px #2c2c30";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 1.5px 1px 2px #2c2c30";
                    }}>
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
                background: "transparent",
                borderColor: "#2c2c30",
                boxShadow:
                  "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px #111115 inset, 0 0 24px #111115";
                e.currentTarget.style.borderColor = "#111115";
                e.currentTarget.style.color = "#F38E00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30";
                e.currentTarget.style.borderColor = "#2c2c30";
                e.currentTarget.style.color = "#E4D9AF";
              }}>
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
                  style={{
                    background: "#F38E00",
                    boxShadow: "0 0 15px #F38E00",
                    color: "black",
                  }}>
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
          backgroundColor: getColor("fondoNavColor", "#111115"),
          borderTopColor: "rgba(234, 179, 8, 0.2)",
        }}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 list-none">
            <li ref={categoriesRef} className="relative">
              <Button
                className="cursor-pointer gap-2 backdrop-blur-sm h-9 px-4"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                style={{
                  background: "none",
                  color: "#E4D9AF",
                  boxShadow: categoriesOpen ? "0 0 15px #E4D9AF" : "0 0 5px #E4D9AF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 15px " + "#E4D9AF";
                  e.currentTarget.style.background = "none";
                }}
                onMouseLeave={(e) => {
                  if (!categoriesOpen) {
                    e.currentTarget.style.boxShadow = "0 0 5px " + "#E4D9AF";
                  }
                  e.currentTarget.style.background = "none";
                }}>
                <Menu className="h-4 w-4" />
                Categorias
              </Button>
              {categoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-[800px] rounded-xl p-6 z-50 animate-in fade-in slide-in-from-top-2"
                  style={{
                    backgroundColor: "#111115",
                    border: "1px solid rgba(234, 179, 8, 0.2)",
                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                  }}>
                  <div className="grid grid-cols-3 gap-6">
                    {categories.slice(0, 9).map((category, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-500/20 group-hover:border-amber-500/50 transition-colors">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-[#E4D9AF] font-medium group-hover:text-amber-400 transition-colors">
                            {category.name}
                          </h4>
                        </div>
                        {category.subcategories && (
                          <ul className="pl-[52px] space-y-1">
                            {category.subcategories.slice(0, 3).map((sub, sIdx) => (
                              <li key={sIdx} className="text-xs text-gray-400 hover:text-amber-200 transition-colors">
                                {sub.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-amber-500/10 text-center">
                    <Link
                      to="/#categories-section"
                      className="text-sm text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                      onClick={() => {
                        setCategoriesOpen(false);
                        // Small timeout to allow dropdown to close before scrolling if needed, 
                        // though native hash behavior might need help in some React setups.
                        // For now, simple hash link.
                        setTimeout(() => {
                          const el = document.getElementById('categories-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}>
                      Ver todas las categorías <Sparkles className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </li>
            {headerConfig?.menuItems ? (
              headerConfig.menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={PATH_MAPPING[item.label] || item.url || "#"}
                    className="text-sm transition-colors"
                    style={{ color: getColor("enlacesNavColor", "#FFD700") }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = getColor("hoverEnlaceNav", "#FFD700"))
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = getColor("enlacesNavColor", "#FFD700"))
                    }>
                    {item.label}
                  </Link>
                </li>
              ))
            ) : "Cargando..."}
            <div className="ml-auto">
              <button
                className="text-sm flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all cursor-pointer"
                style={{
                  color: getColor("titleNoticiasColor", "#FFD700"),
                  scale: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.scale = 1.3;
                }}
                onMouseLeave={(e) => {                    
                  e.currentTarget.style.scale = 1;
                }}>
                <Sparkles
                  className="h-4 w-4"
                  style={{
                    color: "#E4D9AF",
                    filter: "drop-shadow(0 0 5px " + "#E4D9AF" + ")",
                    rotate: "0deg",
                    animation: "rotate 3s ease infinite",
                  }}
                />
                <span>
                  Nuevos Lanzamientos
                </span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
