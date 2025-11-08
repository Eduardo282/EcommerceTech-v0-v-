import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] shadow-2xl z-[999] transform transition-transform duration-300 ease-in-out border-l-2 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Wishlist"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20, 10, 35, 0.98) 0%, rgba(35, 15, 50, 0.98) 100%)",
          borderLeftColor: "rgba(236, 72, 153, 0.5)",
          boxShadow: "-5px 0 40px rgba(236, 72, 153, 0.3)",
        }}>
        {/* Grid Pattern Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(236, 72, 153, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <header
            className="flex items-center justify-between p-6 border-b-2"
            style={{
              background: "rgba(236, 72, 153, 0.1)",
              borderBottomColor: "rgba(236, 72, 153, 0.4)",
              boxShadow: "0 2px 20px rgba(236, 72, 153, 0.2)",
            }}>
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg border-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(236, 72, 153, 0.6) 0%, rgba(219, 39, 119, 0.6) 100%)",
                  borderColor: "rgba(236, 72, 153, 0.7)",
                  boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                }}>
                <Heart className="h-5 w-5 text-pink-200 fill-pink-200" />
              </div>
              <div>
                <h2
                  className="text-xl text-pink-100"
                  style={{
                    textShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
                  }}>
                  My Wishlist
                </h2>
                <p className="text-sm text-pink-200/70">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-all hover:scale-110 border-2 border-pink-500/40"
              style={{
                background: "rgba(20, 10, 35, 0.6)",
                boxShadow: "0 0 10px rgba(236, 72, 153, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(236, 72, 153, 0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(236, 72, 153, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(236, 72, 153, 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 0 10px rgba(236, 72, 153, 0.2)";
              }}>
              <X className="h-5 w-5 text-pink-200" />
            </button>
          </header>

          {/* Items */}
          <section className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                  className="p-6 rounded-full mb-4 border-2"
                  style={{
                    background: "rgba(236, 72, 153, 0.1)",
                    borderColor: "rgba(236, 72, 153, 0.4)",
                    boxShadow: "0 0 30px rgba(236, 72, 153, 0.3)",
                  }}>
                  <Heart className="h-12 w-12 text-pink-300" />
                </div>
                <h3 className="text-xl mb-2 text-pink-100">
                  Your wishlist is empty
                </h3>
                <p className="text-pink-200/70 mb-6">
                  Start adding products you love!
                </p>
                <Button
                  onClick={onClose}
                  className="text-white border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.7) 0%, rgba(219, 39, 119, 0.7) 100%)",
                    borderColor: "rgba(236, 72, 153, 0.6)",
                    boxShadow: "0 0 25px rgba(236, 72, 153, 0.4)",
                    textShadow: "0 0 10px rgba(236, 72, 153, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(236, 72, 153, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(236, 72, 153, 0.4)";
                  }}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl transition-all group border-2"
                    style={{
                      background: "rgba(20, 10, 35, 0.6)",
                      borderColor: "rgba(236, 72, 153, 0.3)",
                      boxShadow: "0 0 15px rgba(236, 72, 153, 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(236, 72, 153, 0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(236, 72, 153, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(236, 72, 153, 0.3)";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(236, 72, 153, 0.15)";
                    }}>
                    {/* Image */}
                    <div
                      className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2"
                      style={{
                        background: "rgba(35, 15, 50, 0.8)",
                        borderColor: "rgba(236, 72, 153, 0.3)",
                      }}>
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Pink Overlay Tint */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-fuchsia-600/20 to-pink-700/20 mix-blend-multiply" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 line-clamp-2 text-pink-100">
                        {item.name}
                      </h3>
                      <p className="text-xs text-pink-200/60 mb-2">
                        {item.category}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-lg text-pink-300"
                          style={{
                            textShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
                          }}>
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-pink-400/40 line-through">
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
                              "linear-gradient(135deg, rgba(219, 39, 119, 0.7) 0%, rgba(190, 24, 93, 0.7) 100%)",
                            borderColor: "rgba(236, 72, 153, 0.6)",
                            boxShadow: "0 0 15px rgba(236, 72, 153, 0.3)",
                          }}
                          onClick={() => {
                            onAddToCart(item);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 0 25px rgba(236, 72, 153, 0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 0 15px rgba(236, 72, 153, 0.3)";
                          }}>
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-400 hover:bg-red-500/20 hover:text-red-300 border-red-500/40 h-8 px-3"
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
              className="border-t-2 p-6 space-y-4"
              style={{
                background: "rgba(236, 72, 153, 0.1)",
                borderTopColor: "rgba(236, 72, 153, 0.4)",
                boxShadow: "0 -2px 20px rgba(236, 72, 153, 0.2)",
              }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-pink-200/70">Total Items:</span>
                <span
                  className="text-xl text-pink-100"
                  style={{
                    textShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
                  }}>
                  {items.length}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 text-pink-200 border-pink-500/40 hover:bg-pink-500/20"
                  onClick={onClose}>
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1 text-white border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.7) 0%, rgba(219, 39, 119, 0.7) 100%)",
                    borderColor: "rgba(236, 72, 153, 0.6)",
                    boxShadow: "0 0 25px rgba(236, 72, 153, 0.4)",
                    textShadow: "0 0 10px rgba(236, 72, 153, 0.5)",
                  }}
                  onClick={() => {
                    items.forEach((item) => onAddToCart(item));
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 35px rgba(236, 72, 153, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 25px rgba(236, 72, 153, 0.4)";
                  }}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>
            </footer>
          )}
        </div>
      </aside>
    </>
  );
}
