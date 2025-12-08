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
          backgroundColor: "#111115",
          borderRadius: "28px",
          boxShadow: "none",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 10px 28px -6px #2c2c30, 0 4px 10px #2c2c30";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
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
            background: "#2c2c30",
            borderTopRightRadius: "26px",
            borderBottomRightRadius: "26px",
            boxShadow:
              "inset 0 0 0 1px transparent, 0 4px 14px -4px transparent",
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
            boxShadow:
              "0 4px 14px -4px #2c2c30",
          }}>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Hover Buttons - Appear from bottom */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[86%] flex gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10"
            style={{
              borderRadius: "22px",
              backdropFilter: "blur(8px)",
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
                    ? "fill-[#980707] text-transparent"
                    : "text-[#FF6467]"
                }`}
              />
            </button>

            <Button
              className="outline-none flex-1 text-white hover:scale-[1.06] transition-all h-12 rounded-xl cursor-pointer"
              style={{
                background: "transparent",
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
                  background: "#410F3A",
                  boxShadow: "0 0 15px #410F3A",
                }}>
                {product.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge
                className="text-white px-3 py-1 animate-pulse outline-none"
                style={{
                  background: "#980707",
                  boxShadow: "0 0 15px #980707",
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
              className="text-xs mb-2 text-white"
              style={{
                background: "#2c2c30",
              }}>
              {product.category}
            </Badge>
          </div>

          <h3
            className="text-lg mb-2 line-clamp-2 text-white transition-colors">
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
                      ? "text-[#FACE2F]"
                      : "text-transparent"
                  }`}
                  style={
                    i < Math.floor(product.rating)
                      ? {
                          filter:
                            "drop-shadow(0 0 3px #FACE2F)",
                        }
                      : {}
                  }
                />
              ))}
            </div>
            <span className="text-sm text-[#898989]">
              {typeof product.reviews === "string"
                ? product.reviews
                : `${product.rating} (${product.reviews} reseñas)`}
            </span>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="flex flex-wrap gap-1 mb-3">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="list-none">
                  <span
                    className="text-xs text-white px-2 py-1 rounded"
                    style={{
                      background: "black",
                    }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 mb-4 text-sm text-[#898989]">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>
                {typeof product.sales === "number"
                  ? `${product.sales.toLocaleString()} descargas`
                  : product.sales}
              </span>
            </div>
          </div>

          {/* Price */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{
              borderTop: "1px solid #898989",
            }}>
            <div>
              {Number(product.originalPrice) > 0 && (
                <p className="text-sm text-[#898989] line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </p>
              )}
              <p
                className="text-2xl text-white">
                ${Number(product.price).toFixed(2)}
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
