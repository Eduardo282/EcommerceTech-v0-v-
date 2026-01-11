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
        className="group relative overflow-hidden transition-all duration-400 cursor-pointer bg-card dark:bg-[#111115] shadow-lg dark:shadow-none"
        style={{
          borderRadius: '28px',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onClick={handleCardClick}
      >
        {/* Nota lateral inspirada en la referencia */}
        <div
          aria-hidden="true"
          className="bg-muted dark:bg-[#2c2c30]"
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
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <button
              className="p-3 rounded-xl transition-all hover:scale-130 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-7 w-7 transition-all ${
                  isInWishlist ? 'fill-[#980707] text-transparent' : 'text-[#FF6467]'
                }`}
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
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
                background: '#2c2c30',
              }}
            >
              {product.category}
            </span>
          </div>

          <h3 className="text-lg mb-2 line-clamp-2 text-white transition-colors">{product.name}</h3>

          {/* Calificación */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? 'text-[#FACE2F]' : 'text-transparent'
                  }`}
                  style={
                    i < Math.floor(product.rating)
                      ? {
                          filter: 'drop-shadow(0 0 3px #FACE2F)',
                        }
                      : {}
                  }
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
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
                      background: 'black',
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>
                {typeof product.sales === 'number'
                  ? `${product.sales.toLocaleString()} descargas`
                  : product.sales}
              </span>
            </div>
          </div>

          {/* Precio */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{
              borderTop: '1px solid #898989',
            }}
          >
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
