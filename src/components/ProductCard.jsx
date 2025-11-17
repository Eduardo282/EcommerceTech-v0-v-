import { Heart, ShoppingCart, Star, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./fallImage/ImageWithFallback";
import { ProductPreview } from "./ProductPreview";

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  allProducts = [],
  wishlistItems = [],
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(product);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleCardClick = () => {
    setPreviewProduct(product);
    setIsPreviewOpen(true);
  };

  const handleProductClick = (selectedProduct) => {
    setPreviewProduct(selectedProduct);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <article
        className="group relative overflow-hidden transition-all duration-400 cursor-pointer"
        style={{
          background:
            "linear-gradient(145deg, rgba(24,24,28,0.92) 0%, rgba(18,18,22,0.92) 55%, rgba(14,14,18,0.94) 100%)",
          borderRadius: "28px",
          border: "1.5px solid rgba(160,160,168,0.18)",
          boxShadow:
            "0 6px 22px -6px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.02)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 10px 28px -6px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,200,205,0.25), inset 0 0 0 1px rgba(255,255,255,0.04)";
          e.currentTarget.style.border = "1.5px solid rgba(200,200,210,0.28)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 6px 22px -6px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.02)";
          e.currentTarget.style.border = "1.5px solid rgba(160,160,168,0.18)";
          e.currentTarget.style.transform = "translateY(0px)";
        }}>
        {/* Side notch inspired by reference */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "33px",
            height: "86px",
            transform: "translateY(-50%)",
            background:
              "linear-gradient(180deg, rgba(180,180,188,0.22) 0%, rgba(130,130,138,0.18) 100%)",
            borderTopRightRadius: "26px",
            borderBottomRightRadius: "26px",
            border: "1px solid rgba(160,160,168,0.25)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.05), 0 4px 14px -4px rgba(0,0,0,0.45)",
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
          }}
        />
        {/* Image Container */}
        <figure
          className="relative aspect-4/3 overflow-hidden"
          style={{
            borderRadius: "22px",
            margin: "16px 16px 0 68px",
            background:
              "linear-gradient(135deg, rgba(40,40,46,0.9) 0%, rgba(28,28,32,0.9) 100%)",
            boxShadow:
              "0 4px 14px -4px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle sheen and fine grid */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.25) 100%)",
              mixBlendMode: "overlay",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.12,
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* Hover Buttons - Appear from bottom */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[86%] flex gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10"
            style={{
              background:
                "linear-gradient(145deg, transparent 0%, transparent 100%)",
              borderRadius: "22px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}>
            <button
              className="p-3 rounded-xl transition-all hover:scale-130"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}>
              <Heart
                className={`h-7 w-7 transition-all ${
                  isInWishlist
                    ? "fill-[#ae3a2e] text-transparent"
                    : "text-red-400"
                }`}
              />
            </button>

            <Button
              className="outline-none flex-1 text-white hover:scale-[1.06] transition-all h-12 rounded-xl cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, transparent 0%, transparent 100%)",
                textShadow: "0 0 6px rgba(255,255,255,0.15)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Añadir al carrito
            </Button>
          </div>

          {/* Badges - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.badge && (
              <Badge
                className="text-white px-3 py-1 text-xs uppercase tracking-wide outline-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.6) 0%, rgba(251, 191, 36, 0.6) 100%)",
                  boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
                  textShadow: "0 0 10px rgba(245, 158, 11, 0.5)",
                }}>
                {product.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge
                className="text-white px-3 py-1 animate-pulse outline-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(239, 68, 68, 0.6) 0%, rgba(236, 72, 153, 0.6) 100%)",
                  boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
                }}>
                -{discount}%
              </Badge>
            )}
          </div>
        </figure>

        {/* Content */}
        <section style={{ padding: "20px 24px 24px 84px" }}>
          <div className="mb-2">
            <Badge
              variant="outline"
              className="text-xs mb-2 border-neutral-500/30 text-neutral-300 backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                boxShadow: "0 0 8px rgba(0,0,0,0.4)",
              }}>
              {product.category}
            </Badge>
          </div>

          <h3
            className="text-lg mb-2 line-clamp-2 text-neutral-100 group-hover:text-neutral-200 transition-colors"
            style={{
              textShadow: "0 0 6px rgba(255,255,255,0.12)",
            }}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-neutral-700"
                  }`}
                  style={
                    i < Math.floor(product.rating)
                      ? {
                          filter:
                            "drop-shadow(0 0 3px rgba(250, 204, 21, 0.5))",
                        }
                      : {}
                  }
                />
              ))}
            </div>
            <span className="text-sm text-neutral-300/70">
              {product.rating} ({product.reviews} reseñas)
            </span>
          </div>

          {/* Features */}
          {product.features && (
            <ul className="flex flex-wrap gap-1 mb-3">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="list-none">
                  <span
                    className="text-xs text-neutral-200 px-2 py-1 rounded border border-neutral-600/30 backdrop-blur-sm"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                    }}>
                    {feature} 
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 mb-4 text-sm text-neutral-300/70">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{product.sales.toLocaleString()} descargas</span>
            </div>
          </div>

          {/* Price */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{
              borderTop: "1px solid rgba(150,150,158,0.22)",
              boxShadow: "0 -1px 6px rgba(0,0,0,0.5)",
            }}>
            <div>
              {product.originalPrice && (
                <p className="text-sm text-neutral-500 line-through">
                  ${product.originalPrice}
                </p>
              )}
              <p
                className="text-2xl text-neutral-200"
                style={{
                  textShadow: "0 0 14px rgba(255,255,255,0.15)",
                }}>
                ${product.price}
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Preview Modal */}
      <ProductPreview
        product={previewProduct}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        isInWishlist={wishlistItems.includes(previewProduct.id)}
        allProducts={allProducts}
        onProductClick={handleProductClick}
      />
    </>
  );
}
