import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageWithFallback } from './fallImage/ImageWithFallback';
import { ProductPreview } from './ProductPreview';

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
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
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
        className="group relative transition-all duration-500 cursor-pointer glass-crystalline"
        style={{
          borderRadius: '28px',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onClick={handleCardClick}
      >
        {/* Nota lateral inspirada en la referencia */}
        <div
          aria-hidden="true"
          className="bg-white/10 dark:bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '33px',
            height: '86px',
            transform: 'translateY(-50%)',
            borderTopRightRadius: '26px',
            borderBottomRightRadius: '26px',
            boxShadow: 'inset 0 0 0 1px transparent, 0 4px 14px -4px transparent',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
        {/* Contenedor de imagen */}
        <figure
          className="relative aspect-4/3 overflow-hidden shadow-md dark:shadow-[0_4px_14px_-4px_#2c2c30]"
          style={{
            borderRadius: '22px',
            margin: '16px 16px 0 68px',
          }}
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Botones de hover - Aparecen desde abajo */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[86%] flex gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10"
            style={{
              borderRadius: '22px',
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            }}
          >
            <button
              className="p-3 rounded-xl transition-all hover:scale-130 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
            >
              <span
                className={`text-3xl leading-none transition-all ${
                  isInWishlist ? 'text-[#980707]' : 'text-[#FF6467]'
                }`}
              >
                {isInWishlist ? '\u2665' : '\u2661'}
              </span>
            </button>

            <button
              className="outline-none flex items-center justify-center flex-1 text-white hover:scale-[1.06] transition-all h-12 rounded-xl cursor-pointer"
              style={{
                background: 'transparent',
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              Añadir al carrito
            </button>
          </div>

          {/* Etiquetas - Superior izquierda */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.badge && (
              <span
                className="inline-flex items-center rounded-full border border-transparent text-white px-3 py-1 text-xs uppercase tracking-wide outline-none font-semibold shadow"
                style={{
                  background: '#410F3A',
                  boxShadow: '0 0 15px #410F3A',
                }}
              >
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span
                className="inline-flex items-center rounded-full border border-transparent text-white px-3 py-1 font-semibold shadow animate-pulse outline-none"
                style={{
                  background: '#980707',
                  boxShadow: '0 0 15px #980707',
                }}
              >
                -{discount}%
              </span>
            )}
          </div>
        </figure>

        {/* Contenido */}
        <section style={{ padding: '20px 24px 24px 84px' }}>
          <div className="mb-2">
            <span
              className="inline-flex items-center rounded-full border border-transparent font-semibold shadow text-xs mb-2 text-white px-2.5 py-0.5"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {product.category}
            </span>
          </div>

          <h3 className="text-lg mb-2 line-clamp-2 text-white transition-colors">{product.name}</h3>

          {/* Calificación */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-base ${
                    i < Math.floor(product.rating) ? 'text-[#FACE2F]' : 'text-transparent'
                  }`}
                  style={i < Math.floor(product.rating) ? { filter: 'drop-shadow(0 0 3px #FACE2F)' } : {}}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <span className="text-sm text-[#898989]">
              {typeof product.reviews === 'string'
                ? product.reviews
                : `${product.rating} (${product.reviews} reseñas)`}
            </span>
          </div>

          {/* Características */}
          {product.features && product.features.length > 0 && (
            <ul className="flex flex-wrap gap-1 mb-3">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="list-none">
                  <span
                    className="text-xs text-white px-2 py-1 rounded"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Estadísticas */}
          <div className="flex items-center gap-3 mb-4 text-sm text-[#898989]">
            <div className="flex items-center gap-1">
              <span className="text-base leading-none">&#8595;</span>
              <span>
                {typeof product.sales === 'number'
                  ? `${product.sales.toLocaleString()} descargas`
                  : product.sales}
              </span>
            </div>
          </div>

          {/* Precio */}
          <div className="flex items-center justify-between pt-4">
            <div>
              {Number(product.originalPrice) > 0 && (
                <p className="text-sm text-[#898989] line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </p>
              )}
              <p className="text-2xl text-white">${Number(product.price).toFixed(2)}</p>
            </div>
          </div>
        </section>
      </article>

      {/* Previsualización Modal */}
      <ProductPreview
        key={previewProduct.id}
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

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    reviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    badge: PropTypes.string,
    category: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
  isInWishlist: PropTypes.bool,
  allProducts: PropTypes.array,
  wishlistItems: PropTypes.array,
};
