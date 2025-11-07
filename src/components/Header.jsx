import {
  ShoppingCart,
  Search,
  User,
  Menu,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Header({
  onCartClick,
  cartItemsCount,
  onWishlistClick,
  wishlistItemsCount,
}) {
  return (
    <header
      className="sticky top-0 z-50 w-full shadow-2xl border-b-2"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10, 15, 30, 0.98) 0%, rgba(13, 20, 35, 0.98) 100%)",
        borderBottomColor: "rgba(14, 165, 233, 0.3)",
        boxShadow: "0 4px 30px rgba(14, 165, 233, 0.2)",
      }}>
      {/* Top Bar */}
      <div
        className="relative overflow-hidden border-b-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
          borderBottomColor: "rgba(14, 165, 233, 0.2)",
        }}>
        <div className="absolute inset-0 animate-shimmer"></div>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm relative z-10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Sparkles
                className="h-4 w-4 animate-pulse text-cyan-400"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(14, 165, 233, 0.6))",
                }}
              />
              <span
                className="text-cyan-100"
                style={{
                  textShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
                }}>
                Black Friday Sale - Up to 70% OFF on Premium Templates
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-cyan-300 transition-colors text-cyan-200/70">
              Help Center
            </button>
            <button className="hover:text-cyan-300 transition-colors text-cyan-200/70">
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              {/* 3D Isometric Box Effect with Cyan */}
              <div className="relative w-12 h-12 perspective-1000">
                {/* Main cube face */}
                <div
                  className="absolute inset-0 rounded-lg shadow-lg transform group-hover:scale-110 transition-all duration-300 border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(14, 165, 233, 0.6) 0%, rgba(6, 182, 212, 0.6) 100%)",
                    borderColor: "rgba(14, 165, 233, 0.5)",
                    boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
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
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-80 blur-sm animate-pulse" />
                </div>
                {/* Top face */}
                <div
                  className="absolute -top-2 left-1 right-1 h-2 transform skew-y-[-30deg] opacity-60 rounded-t"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(14, 165, 233, 0.5) 0%, rgba(6, 182, 212, 0.5) 100%)",
                  }}
                />
                {/* Side face */}
                <div
                  className="absolute top-1 -right-2 bottom-1 w-2 transform skew-x-[-30deg] opacity-40 rounded-r"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(8, 145, 178, 0.5) 0%, rgba(6, 182, 212, 0.5) 100%)",
                  }}
                />
              </div>
            </div>
            <div>
              <h1
                className="text-xl tracking-tight text-cyan-100 group-hover:text-cyan-300 transition-all flex items-center gap-2"
                style={{
                  textShadow: "0 0 15px rgba(14, 165, 233, 0.4)",
                }}>
                TechMarket
                <span
                  className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-lg"
                  style={{
                    boxShadow: "0 0 10px rgba(14, 165, 233, 0.8)",
                  }}
                />
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <p
                  className="text-[10px] uppercase tracking-[0.2em] bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
                  }}>
                  Virtual Marketplace
                </p>
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400/70 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search dashboards, templates, licenses, automation tools..."
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 text-cyan-100 placeholder-cyan-300/40 transition-all border-2"
                style={{
                  background: "rgba(13, 27, 58, 0.6)",
                  borderColor: "rgba(14, 165, 233, 0.3)",
                  boxShadow: "inset 0 0 10px rgba(14, 165, 233, 0.1)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.6)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(14, 165, 233, 0.3), inset 0 0 15px rgba(14, 165, 233, 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.3)";
                  e.currentTarget.style.boxShadow =
                    "inset 0 0 10px rgba(14, 165, 233, 0.1)";
                }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(14, 165, 233, 0) 0%, rgba(14, 165, 233, 0.05) 50%, rgba(14, 165, 233, 0) 100%)",
                }}></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-cyan-200 border-2 border-cyan-500/40 backdrop-blur-sm"
              onClick={onWishlistClick}
              style={{
                background: "rgba(13, 27, 58, 0.6)",
                boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.7)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(14, 165, 233, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(14, 165, 233, 0.2)";
              }}>
              <Heart className="h-5 w-5 group-hover:text-red-400 transition-colors" />
              {wishlistItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 border-2 animate-pulse"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239, 68, 68, 0.7) 0%, rgba(236, 72, 153, 0.7) 100%)",
                    borderColor: "rgba(239, 68, 68, 0.6)",
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
                  }}>
                  {wishlistItemsCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-cyan-200 border-2 border-cyan-500/40 backdrop-blur-sm"
              style={{
                background: "rgba(13, 27, 58, 0.6)",
                boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.7)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(14, 165, 233, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(14, 165, 233, 0.2)";
              }}>
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-cyan-200 border-2 border-cyan-500/40 backdrop-blur-sm"
              onClick={onCartClick}
              style={{
                background: "rgba(13, 27, 58, 0.6)",
                boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.7)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(14, 165, 233, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(14, 165, 233, 0.2)";
              }}>
              <ShoppingCart className="h-5 w-5 group-hover:text-cyan-300 transition-colors" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 border-2 animate-pulse"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(14, 165, 233, 0.7) 0%, rgba(59, 130, 246, 0.7) 100%)",
                    borderColor: "rgba(14, 165, 233, 0.6)",
                    boxShadow: "0 0 15px rgba(14, 165, 233, 0.5)",
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
        className="border-t-2"
        style={{
          background: "rgba(10, 15, 30, 0.8)",
          borderTopColor: "rgba(14, 165, 233, 0.2)",
        }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3">
            <Button
              variant="ghost"
              className="gap-2 text-cyan-100 border-2 border-cyan-500/40 backdrop-blur-sm h-9 px-4"
              style={{
                background: "rgba(13, 27, 58, 0.6)",
                boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.7)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(14, 165, 233, 0.4)";
                e.currentTarget.style.background = "rgba(13, 27, 58, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(14, 165, 233, 0.2)";
                e.currentTarget.style.background = "rgba(13, 27, 58, 0.6)";
              }}>
              <Menu className="h-4 w-4" />
              All Categories
            </Button>
            <a
              href="#"
              className="text-sm text-cyan-200/70 hover:text-cyan-300 transition-colors">
              Dashboard Templates
            </a>
            <a
              href="#"
              className="text-sm text-cyan-200/70 hover:text-cyan-300 transition-colors">
              Admin Panels
            </a>
            <a
              href="#"
              className="text-sm text-cyan-200/70 hover:text-cyan-300 transition-colors">
              SaaS Kits
            </a>
            <a
              href="#"
              className="text-sm text-cyan-200/70 hover:text-cyan-300 transition-colors">
              Automation Tools
            </a>
            <a
              href="#"
              className="text-sm text-cyan-200/70 hover:text-cyan-300 transition-colors">
              CV Templates
            </a>
            <a
              href="#"
              className="text-sm text-cyan-200/70 hover:text-cyan-300 transition-colors">
              Licenses
            </a>
            <button
              className="ml-auto text-sm flex items-center gap-2 px-4 py-1.5 rounded-lg border-2 transition-all"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(245, 158, 11, 0.2) 20%, rgba(14, 165, 233, 0.2) 40%, rgba(168, 85, 247, 0.2) 60%, rgba(236, 72, 153, 0.2) 80%, rgba(251, 146, 60, 0.2) 100%)",
                borderColor: "rgba(251, 146, 60, 0.5)",
                boxShadow: "0 0 15px rgba(251, 146, 60, 0.3)",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 3s ease infinite",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(251, 146, 60, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(251, 146, 60, 0.5)";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(251, 146, 60, 0.3)";
              }}>
              <Sparkles
                className="h-4 w-4 text-orange-300"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(251, 146, 60, 0.6))",
                }}
              />
              <span
                className="text-orange-100"
                style={{
                  textShadow: "0 0 10px rgba(251, 146, 60, 0.4)",
                }}>
                New Arrivals
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
