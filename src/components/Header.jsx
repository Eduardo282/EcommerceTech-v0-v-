import {
  ShoppingCart,
  Search,
  User,
  Menu,
  Heart,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { RubroSelector } from "./RubroSelector";
import { Badge } from "./ui/badge";
import { useRubro, RUBROS } from "../context/RubroContext";

export function Header({
  onCartClick,
  cartItemsCount,
  onWishlistClick,
  wishlistItemsCount,
  onUserClick,
}) {
  const { isSeller, rubro, setRubro, setIsSeller, setStore } = useRubro();
  const [isAuthed, setIsAuthed] = useState(
    !!localStorage.getItem("auth.token")
  );
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handler = () => setIsAuthed(!!localStorage.getItem("auth.token"));
    window.addEventListener("auth:changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("auth:changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  useEffect(() => {
    const onDown = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
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
        backgroundColor: "black",
        boxShadow: "0 4px 32px #2F2F33",
      }}>
      {/* Top Bar AD */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)",
        }}
        aria-label="site announcement">
        <div className="absolute inset-0 animate-shimmer"></div>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm relative z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Sparkles
                className="h-4 w-4 animate-pulse text-amber-400"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(234, 179, 8, 0.6))",
                }}
              />
              <span
                className="text-amber-100"
                style={{
                  textShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                }}>
                ¡Oferta especial! Obtén un 20% de descuento en tu primera compra
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-amber-300 transition-colors text-amber-200/70">
              Ayuda & Soporte
            </button>
            <button className="hover:text-amber-300 transition-colors text-amber-200/70">
              Rastrear Pedido
            </button>
          </div>
        </div>
      </section>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              {/* 3D Isometric Box Effect */}
              <div className="relative w-12 h-12 perspective-1000">
                <div
                  className="absolute inset-0 rounded-lg shadow-lg transform group-hover:scale-110 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251, 191, 36, 0.55) 0%, rgba(245, 158, 11, 0.55) 100%)",
                    boxShadow: "0 0 20px rgba(234, 179, 8, 0.35)",
                  }}>
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                  {/* Glow center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-200 rounded-full opacity-80 blur-sm animate-pulse" />
                </div>
              </div>
              {/* Top face */}
              <div
                className="absolute -top-2 left-1 right-1 h-2 transform skew-y-[-30deg] opacity-60 rounded-t"
                style={{
                  background:
                    "linear-gradient(to right, rgba(251, 191, 36, 0.5) 0%, rgba(245, 158, 11, 0.5) 100%)",
                }}
              />
              {/* Side face */}
              <div
                className="absolute top-1 -right-2 bottom-1 w-2 transform skew-x-[-30deg] opacity-40 rounded-r"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(217, 119, 6, 0.55) 0%, rgba(245, 158, 11, 0.55) 100%)",
                }}
              />
            </div>
            <div>
              <h1
                className="text-xl tracking-tight text-amber-100 group-hover:text-amber-300 transition-all flex items-center gap-2 font-display"
                style={{
                  textShadow: "0 0 15px rgba(234, 179, 8, 0.35)",
                }}>
                EvoHance
                <span
                  className="inline-block w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-lg"
                  style={{
                    boxShadow: "0 0 10px rgba(234, 179, 8, 0.8)",
                  }}
                />
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="h-px w-6 bg-linear-to-r from-transparent via-amber-400 to-transparent" />
                <p
                  className="text-[10px] uppercase tracking-[0.2em] bg-linear-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                  }}>
                  Tienda Digital
                </p>
                <div className="h-px w-6 bg-linear-to-r from-transparent via-amber-400 to-transparent" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <form
              role="search"
              className="relative group"
              onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="header-search" className="sr-only">
                Search products
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#f0e4b8] group-focus-within:text-[#f0e4b8] transition-colors" />
              <input
                id="header-search"
                type="text"
                placeholder="Busca dashboards, plantillas, controladores, herramientas de automatización..."
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none text-[#b7a663] placeholder-[#2C2C30] transition-all border-2"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  borderColor: "#111115",
                  boxShadow: "inset 0 0 10px rgba(234, 179, 8, 0.08)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#111115";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #2C2C30, inset 0 0 15px #2C2C30";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#111115";
                  e.currentTarget.style.boxShadow = "inset 0 0 10px #2C2C30";
                }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, #2C2C3050 0%, #2C2C3050 50%, #2C2C3050 100%)",
                }}></div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Rubro first, then wishlist, login, cart (order per reference) */}
            <RubroSelector />
            <Button
              size="icon"
              className="relative text-[#f0e4b8] border-2 rounded-xl cursor-pointer"
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
                e.currentTarget.style.color = "#f0e4b8";
              }}>
              <Heart className="h-4 w-4" />
              {wishlistItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.9), rgba(14,165,233,0.8))",
                    boxShadow: "0 0 15px rgba(56,189,248,0.55)",
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
                  <span className="text-[#f0e4b8] text-xs md:inline-block">
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
                    background: "#2c2c30",
                    backdropFilter: "blur(10px)",
                  }}>
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg text-[#f0e4b8] cursor-pointer"
                    style={{ boxShadow: "0 1.5px 1px 2px #111115" }}
                    onClick={() => setAccountOpen(false)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "inset 0 1.5px 1px 2px #222225";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 1.5px 1px 2px #111115";
                    }}>
                    Perfil
                  </button>
                  <button
                    className="w-full mt-1 text-left px-3 py-2 rounded-lg text-[#f0e4b8] cursor-pointer"
                    style={{ boxShadow: "0 1.5px 1px 2px #111115" }}
                    onClick={() => {
                      localStorage.removeItem("auth.token");
                      // Reset rubro to TECHNOLOGY and disable behavior will follow automatically
                      setRubro(RUBROS.TECHNOLOGY);
                      setIsSeller(false);
                      setStore({ name: null, description: null });
                      window.dispatchEvent(new Event("auth:changed"));
                      setAccountOpen(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "inset 0 1.5px 1px 2px #222225";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 1.5px 1px 2px #111115";
                    }}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
            <Button
              size="icon"
              className="relative text-[#f0e4b8] border-2 rounded-xl cursor-pointer"
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
                e.currentTarget.style.color = "#F48F00";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 1px #2c2c30 inset, 0 0 16px #2c2c30";
                e.currentTarget.style.borderColor = "#2c2c30";
                e.currentTarget.style.color = "#f0e4b8";
              }}>
              <ShoppingCart className="h-4 w-4" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 animate-pulse"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.9), rgba(14,165,233,0.8))",
                    boxShadow: "0 0 15px rgba(56,189,248,0.55)",
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
          backgroundColor: "#111115",
          borderTopColor: "rgba(234, 179, 8, 0.2)",
        }}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 list-none">
            <li>
              <Button
                variant="ghost"
                className="cursor-pointer gap-2 text-amber-100 border-2 border-amber-500/40 backdrop-blur-sm h-9 px-4"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  boxShadow: "0 0 10px rgba(234, 179, 8, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.7)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(234, 179, 8, 0.4)";
                  e.currentTarget.style.background = "rgba(18, 16, 10, 0.75)";
                  e.currentTarget.style.color = "#fde68a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(234, 179, 8, 0.2)";
                  e.currentTarget.style.background = "rgba(18, 16, 10, 0.6)";
                }}>
                <Menu className="h-4 w-4" />
                Categorias
              </Button>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                Plantillas dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                Plantillas Auth
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                Componentes de UI
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                Libros de programacion
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                Guias de estudio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm text-amber-200/70 hover:text-amber-300 transition-colors">
                Controladores
              </a>
            </li>
            <div className="ml-auto">
              <button
                className="text-sm flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251, 191, 36, 0.18) 0%, rgba(245, 158, 11, 0.22) 40%, rgba(217, 119, 6, 0.22) 100%)",
                  boxShadow: "0 0 15px rgba(234, 179, 8, 0.25)",
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 3s ease infinite",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(234, 179, 8, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(234, 179, 8, 0.25)";
                }}>
                <Sparkles
                  className="h-4 w-4 text-amber-300"
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(234, 179, 8, 0.6))",
                  }}
                />
                <span
                  className="text-amber-100"
                  style={{
                    textShadow: "0 0 10px rgba(234, 179, 8, 0.4)",
                  }}>
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
