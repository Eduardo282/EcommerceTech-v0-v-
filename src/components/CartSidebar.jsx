import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CartSidebar({ isOpen, onClose, items, onRemoveItem }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const savings = items.reduce((sum, item) => {
    return sum + (item.originalPrice ? item.originalPrice - item.price : 0);
  }, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md shadow-2xl z-50 transform transition-transform duration-300 border-l-2 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5, 30, 20, 0.98) 0%, rgba(10, 40, 30, 0.98) 100%)",
          borderLeftColor: "rgba(16, 185, 129, 0.5)",
          boxShadow: "-5px 0 40px rgba(16, 185, 129, 0.3)",
        }}>
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <header
            className="flex items-center justify-between p-6 border-b-2"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              borderBottomColor: "rgba(16, 185, 129, 0.4)",
              boxShadow: "0 2px 20px rgba(16, 185, 129, 0.2)",
            }}>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg border-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.6) 0%, rgba(5, 150, 105, 0.6) 100%)",
                  borderColor: "rgba(16, 185, 129, 0.7)",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
                }}>
                <ShoppingBag className="h-5 w-5 text-emerald-200" />
              </div>
              <div>
                <h2
                  className="text-xl text-emerald-100"
                  style={{
                    textShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                  }}>
                  Shopping Cart
                </h2>
                <p className="text-sm text-emerald-200/70">
                  {items.length} items
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full transition-all hover:scale-110 border-2 border-emerald-500/40"
              style={{
                background: "rgba(5, 30, 20, 0.6)",
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(16, 185, 129, 0.2)";
              }}>
              <X className="h-5 w-5 text-emerald-200" />
            </Button>
          </header>

          {/* Items */}
          <section className="flex-1 overflow-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                  className="p-8 rounded-full mb-4 border-2"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
                  }}>
                  <ShoppingBag className="h-12 w-12 text-emerald-300" />
                </div>
                <h3 className="text-xl mb-2 text-emerald-100">
                  Your cart is empty
                </h3>
                <p className="text-emerald-200/70 mb-6">
                  Add some amazing products to get started!
                </p>
                <Button
                  onClick={onClose}
                  className="text-white border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.7) 0%, rgba(5, 150, 105, 0.7) 100%)",
                    borderColor: "rgba(16, 185, 129, 0.6)",
                    boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
                    textShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(16, 185, 129, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(16, 185, 129, 0.4)";
                  }}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl p-4 border-2 transition-all"
                    style={{
                      background: "rgba(5, 30, 20, 0.6)",
                      borderColor: "rgba(16, 185, 129, 0.3)",
                      boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(16, 185, 129, 0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(16, 185, 129, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(16, 185, 129, 0.3)";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(16, 185, 129, 0.15)";
                    }}>
                    <div
                      className="relative w-20 h-20 rounded-lg overflow-hidden border-2"
                      style={{
                        borderColor: "rgba(16, 185, 129, 0.3)",
                      }}>
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                      {/* Green Overlay Tint */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-green-600/20 to-emerald-700/15 mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 line-clamp-2 text-emerald-100">
                        {item.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs mb-2 text-emerald-300 border-emerald-500/40 bg-emerald-500/10">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {item.originalPrice && (
                          <span className="text-xs text-emerald-400/40 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span
                          className="text-lg text-emerald-300"
                          style={{
                            textShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                          }}>
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="hover:bg-red-500/20 hover:text-red-300 text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer */}
          {items.length > 0 && (
            <footer
              className="border-t-2 p-6"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                borderTopColor: "rgba(16, 185, 129, 0.4)",
                boxShadow: "0 -2px 20px rgba(16, 185, 129, 0.2)",
              }}>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-200/70">Subtotal</span>
                  <span className="text-emerald-100">${total.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span
                      className="text-emerald-400"
                      style={{
                        textShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
                      }}>
                      Savings
                    </span>
                    <span
                      className="text-emerald-400"
                      style={{
                        textShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
                      }}>
                      -${savings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div
                  className="flex justify-between text-lg pt-3 border-t-2"
                  style={{
                    borderTopColor: "rgba(16, 185, 129, 0.3)",
                  }}>
                  <span className="text-emerald-100">Total</span>
                  <span
                    className="text-emerald-300"
                    style={{
                      textShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
                    }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full text-white py-6 text-lg rounded-xl shadow-lg border-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.7) 0%, rgba(5, 150, 105, 0.7) 100%)",
                  borderColor: "rgba(16, 185, 129, 0.6)",
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
                  textShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 45px rgba(16, 185, 129, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(16, 185, 129, 0.4)";
                }}>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-center text-emerald-200/60 mt-4">
                🔒 Secure checkout with SSL encryption
              </p>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}
