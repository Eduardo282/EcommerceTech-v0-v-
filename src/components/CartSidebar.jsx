import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./fallImage/ImageWithFallback";

export function CartSidebar({ isOpen, onClose, items, onRemoveItem }) {
  // Ensure all numeric operations use numbers (handle string prices from API)
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const savings = items.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice
        ? Number(item.originalPrice || 0) - Number(item.price || 0)
        : 0),
    0
  );

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
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "#111115",
          boxShadow: "0 0 30px #2c2c30",
        }}
        aria-label="shopping cart sidebar">
        <div
          className="absolute inset-0 opacity-15"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(234, 179, 8, 0.28) 100px, rgba(234, 179, 8, 0.28) 101px)",
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          <header
            className="p-4 flex items-center justify-between"
            style={{
              background: "#111115",
              outline: "none",
              boxShadow: "0 0 10px #2c2c30",
            }}>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg border-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251, 191, 36, 0.55) 0%, rgba(245, 158, 11, 0.55) 100%)",
                  borderColor: "rgba(234, 179, 8, 0.5)",
                  boxShadow: "0 0 14px rgba(234, 179, 8, 0.35)",
                }}>
                <ShoppingBag className="h-5 w-5 text-amber-100" />
              </div>
              <div>
                <h2
                  className="text-lg font-semibold text-amber-100 font-display"
                  style={{ textShadow: "0 0 15px rgba(234, 179, 8, 0.35)" }}>
                  Carrito
                </h2>
                <p className="text-amber-300/70 text-sm">
                  {items.length} artículos
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full border-2 cursor-pointer"
              style={{
                borderColor: "rgba(234, 179, 8, 0.4)",
                background: "rgba(18,16,10,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(234, 179, 8, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(234, 179, 8, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(234, 179, 8, 0.2)";
              }}>
              <X className="h-5 w-5 text-amber-200" />
            </Button>
          </header>

          <section className="flex-1 overflow-auto scrollbar-hide p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                  className="p-8 rounded-full mb-4 border-2"
                  style={{
                    background: "rgba(234, 179, 8, 0.12)",
                    borderColor: "rgba(234, 179, 8, 0.35)",
                    boxShadow: "0 0 18px rgba(234, 179, 8, 0.25)",
                  }}>
                  <ShoppingBag className="h-12 w-12 text-amber-200" />
                </div>
                <h3 className="text-xl mb-2 text-amber-100">
                  Tu carrito está vacío
                </h3>
                <p className="text-amber-200/70 mb-6">
                  Agrega algunos productos para comenzar.
                </p>
                <Button
                  onClick={onClose}
                  className="text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(251, 191, 36, 0.65) 0%, rgba(245, 158, 11, 0.65) 100%)",
                    boxShadow: "0 0 25px rgba(234, 179, 8, 0.35)",
                    textShadow: "0 0 10px rgba(234, 179, 8, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(234, 179, 8, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(234, 179, 8, 0.35)";
                  }}>
                  Seguir comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl p-4 transition-all"
                    style={{
                      background: "#2c2c30",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 25px #2c2c30";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}>
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 line-clamp-2 text-amber-100">
                        {item.name}
                      </h3>
                      <Badge className="outline-none text-xs mb-2 text-amber-300 bg-amber-500/10">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {item.originalPrice && (
                          <span className="text-xs text-amber-300/40 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span
                          className="text-lg text-amber-300"
                          style={{
                            textShadow: "0 0 15px rgba(234, 179, 8, 0.35)",
                          }}>
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="bg-transparent hover:bg-transparent hover:text-red-300 text-red-400 cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {items.length > 0 && (
            <footer
              className="border-t-2 p-6"
              style={{
                background: "#111115",
                borderTopColor: "#2c2c30",
                boxShadow: "0 -2px 20px #2c2c30",
              }}>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-200/70">Subtotal</span>
                  <span className="text-amber-100">${total.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span
                      className="text-amber-400"
                      style={{ textShadow: "0 0 10px rgba(234, 179, 8, 0.5)" }}>
                      Ahorros
                    </span>
                    <span
                      className="text-amber-400"
                      style={{ textShadow: "0 0 10px rgba(234, 179, 8, 0.5)" }}>
                      -${savings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div
                  className="flex justify-between text-lg pt-3 border-t-2"
                  style={{ borderTopColor: "#2c2c30" }}>
                  <span className="text-amber-100">Total</span>
                  <span
                    className="text-amber-300"
                    style={{ textShadow: "0 0 20px rgba(234, 179, 8, 0.5)" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full text-white py-6 text-lg rounded-xl shadow-lg cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251, 191, 36, 0.65) 0%, rgba(245, 158, 11, 0.65) 100%)",
                  textShadow: "0 0 15px rgba(234, 179, 8, 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 45px #ffffff50";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}>
                Proceder al pago
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-center text-amber-200/60 mt-4">
                🔒 Pago seguro
              </p>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}
