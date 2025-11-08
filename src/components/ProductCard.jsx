import { Heart, ShoppingCart, Star, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
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
        className="group relative rounded-2xl border-2 border-cyan-500/40 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-xl"
        style={{
          background: "rgba(13, 27, 58, 0.6)",
          boxShadow:
            "0 0 20px rgba(14, 165, 233, 0.2), inset 0 0 20px rgba(14, 165, 233, 0.05)",
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.8)";
          e.currentTarget.style.boxShadow =
            "0 0 30px rgba(14, 165, 233, 0.4), 0 0 60px rgba(14, 165, 233, 0.2), inset 0 0 30px rgba(14, 165, 233, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.4)";
          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(14, 165, 233, 0.2), inset 0 0 20px rgba(14, 165, 233, 0.05)";
        }}>
        {/* Image Container */}
        <figure className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-950 to-cyan-950">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Blue Overlay Tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-cyan-700/20 mix-blend-multiply" />

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Hover Buttons - Appear from bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              className="p-3 rounded-full transition-all hover:scale-110 shadow-lg border-2 border-cyan-400/60 backdrop-blur-sm"
              style={{
                background: "rgba(13, 27, 58, 0.8)",
                boxShadow: "0 0 15px rgba(14, 165, 233, 0.3)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.9)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(14, 165, 233, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(14, 165, 233, 0.3)";
              }}>
              <Heart
                className={`h-5 w-5 transition-all ${
                  isInWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-cyan-300 hover:text-red-400"
                }`}
              />
            </button>

            <Button
              className="flex-1 text-white hover:scale-105 transition-all h-12 border-2 border-cyan-400/60"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14, 165, 233, 0.6) 0%, rgba(59, 130, 246, 0.6) 100%)",
                boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
                textShadow: "0 0 10px rgba(14, 165, 233, 0.5)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(14, 165, 233, 0.6)";
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(14, 165, 233, 0.4)";
                e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.6)";
              }}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Badges - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.badge && (
              <Badge
                className="text-white border-2 border-yellow-400/60 px-3 py-1 text-xs uppercase tracking-wide"
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
                className="text-white border-2 border-pink-400/60 px-3 py-1 animate-pulse"
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
        <section className="p-5">
          <div className="mb-2">
            <Badge
              variant="outline"
              className="text-xs mb-2 border-cyan-400/40 text-cyan-300 backdrop-blur-sm"
              style={{
                background: "rgba(14, 165, 233, 0.1)",
                boxShadow: "0 0 10px rgba(14, 165, 233, 0.2)",
              }}>
              {product.category}
            </Badge>
          </div>

          <h3
            className="text-lg mb-2 line-clamp-2 text-cyan-100 group-hover:text-cyan-300 transition-colors"
            style={{
              textShadow: "0 0 10px rgba(14, 165, 233, 0.3)",
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
                      : "text-cyan-900"
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
            <span className="text-sm text-cyan-300/70">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Features */}
          {product.features && (
            <ul className="flex flex-wrap gap-1 mb-3">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="list-none">
                  <span
                    className="text-xs text-cyan-200 px-2 py-1 rounded border border-cyan-500/30 backdrop-blur-sm"
                    style={{
                      background: "rgba(14, 165, 233, 0.1)",
                    }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 mb-4 text-sm text-cyan-300/70">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{product.sales.toLocaleString()} sales</span>
            </div>
          </div>

          {/* Price */}
          <div
            className="flex items-center justify-between pt-4 border-t-2 border-cyan-500/30"
            style={{
              boxShadow: "0 -1px 10px rgba(14, 165, 233, 0.1)",
            }}>
            <div>
              {product.originalPrice && (
                <p className="text-sm text-cyan-600 line-through">
                  ${product.originalPrice}
                </p>
              )}
              <p
                className="text-2xl text-cyan-300"
                style={{
                  textShadow:
                    "0 0 20px rgba(14, 165, 233, 0.6), 0 0 40px rgba(14, 165, 233, 0.3)",
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
