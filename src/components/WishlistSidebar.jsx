import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./fallImage/ImageWithFallback";
import { Button } from "./ui/button";

export function WishlistSidebar({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] shadow-2xl z-999 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Wishlist"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,12,16,0.95) 0%, #111115 100%)",
          boxShadow: "-5px 0 38px #2c2c30",
        }}>
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(234, 179, 8, 0.22) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(234, 179, 8, 0.22) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <header
            className="flex items-center justify-between p-6"
            style={{
              background: "rgba(234, 179, 8, 0.08)",
              boxShadow: "0 2px 20px rgba(234, 179, 8, 0.18)",
            }}>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg border-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251, 191, 36, 0.55) 0%, rgba(245, 158, 11, 0.55) 100%)",
                  borderColor: "rgba(234, 179, 8, 0.5)",
                  boxShadow: "0 0 18px rgba(234, 179, 8, 0.35)",
                }}>
                <Heart className="h-5 w-5 text-amber-200 fill-amber-200" />
              </div>
              <div>
                <h2
                  className="text-xl text-amber-100 font-display"
                  style={{
                    textShadow: "0 0 15px rgba(234, 179, 8, 0.45)",
                  }}>
                  Mi Lista de Deseos
                </h2>
                <p className="text-sm text-amber-200/70">
                  {items.length} {items.length === 1 ? "artículo" : "artículos"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-all hover:scale-110 border-2 border-amber-500/40"
              style={{
                background: "rgba(18,16,10,0.55)",
                boxShadow: "0 0 10px rgba(234,179,8,0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(234,179,8,0.75)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(234,179,8,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(234,179,8,0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(234,179,8,0.22)";
              }}>
              <X className="h-5 w-5 text-amber-200 cursor-pointer" />
            </button>
          </header>

          {/* Items */}
          <section className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                  className="p-6 rounded-full mb-4 border-2"
                  style={{
                    background: "rgba(234,179,8,0.08)",
                    borderColor: "rgba(234,179,8,0.35)",
                    boxShadow: "0 0 30px rgba(234,179,8,0.28)",
                  }}>
                  <Heart className="h-12 w-12 text-amber-300" />
                </div>
                <h3 className="text-xl mb-2 text-amber-100 font-display">
                  Tu lista de deseos está vacía
                </h3>
                <p className="text-amber-200/70 mb-6">
                  ¡Empieza a agregar productos que te encanten!
                </p>
                <Button
                  onClick={onClose}
                  className="text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251,191,36,0.65) 0%, rgba(245,158,11,0.65) 100%)",
                    boxShadow: "0 0 25px rgba(234,179,8,0.35)",
                    textShadow: "0 0 10px rgba(234,179,8,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(234,179,8,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(234,179,8,0.35)";
                  }}>
                  Seguir Explorando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl transition-all group"
                    style={{
                      background: "#2c2c30",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 25px #2c2c30";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}>
                    {/* Image */}
                    <div
                      className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden"
                      style={{
                        background: "transparent",
                      }}>
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 line-clamp-2 text-amber-100">
                        {item.name}
                      </h3>
                      <p className="text-xs text-amber-200/60 mb-2">
                        {item.category}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-lg text-amber-300"
                          style={{
                            textShadow: "0 0 15px rgba(234, 179, 8, 0.45)",
                          }}>
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-amber-400/40 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 text-white text-xs h-8 border-2"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(251,191,36,0.6) 0%, rgba(245,158,11,0.6) 100%)",
                            borderColor: "rgba(234,179,8,0.45)",
                            boxShadow: "0 0 15px rgba(234,179,8,0.28)",
                          }}
                          onClick={() => {
                            onAddToCart(item);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 0 25px rgba(234,179,8,0.45)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 0 15px rgba(234,179,8,0.28)";
                          }}>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Añadir al Carrito
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-400 hover:bg-red-500/20 hover:text-red-300 border-red-500/40 h-8 px-3 cursor-pointer"
                          onClick={() => onRemoveItem(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer - Only show if there are items */}
          {items.length > 0 && (
            <footer
              className="p-6 space-y-4"
              style={{
                background: "rgba(234,179,8,0.08)",
                boxShadow: "0 -2px 20px rgba(234,179,8,0.18)",
              }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-amber-200/70">Total Artículos:</span>
                <span
                  className="text-xl text-amber-100 font-display"
                  style={{
                    textShadow: "0 0 15px rgba(234, 179, 8, 0.45)",
                  }}>
                  {items.length}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 text-amber-200 border-amber-500/30 hover:bg-amber-500/20 hover:text-white"
                  onClick={onClose}>
                  Continuar Comprando
                </Button>
                <Button
                  className="flex-1 text-white border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251,191,36,0.65) 0%, rgba(245,158,11,0.65) 100%)",
                    borderColor: "rgba(234,179,8,0.5)",
                    boxShadow: "0 0 25px rgba(234,179,8,0.3)",
                    textShadow: "0 0 10px rgba(234,179,8,0.45)",
                  }}
                  onClick={() => {
                    items.forEach((item) => onAddToCart(item));
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(234,179,8,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(234,179,8,0.3)";
                  }}>
                  <ShoppingCart className="h-4 w-4 mr-2 text-amber-100" />
                  Añadir Todo al Carrito
                </Button>
              </div>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}
