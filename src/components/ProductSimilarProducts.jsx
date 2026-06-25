import PropTypes from 'prop-types';

export function ProductSimilarProducts({
  onProductClick,
  onScrollLeft,
  onScrollRight,
  products,
  scrollRef,
}) {
  if (products.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm mb-3 text-[#F9B61D]">Productos Similares</h3>
      <div className="relative">
        <button
          onClick={onScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all cursor-pointer bg-[#111115] text-[#E4D9AF]"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductClick?.(product)}
              className="shrink-0 w-24 group cursor-pointer mt-3"
            >
              <div className="relative aspect-3/4 rounded-lg overflow-hidden mb-1.5 transition-all hover:shadow-[0_0_15px_#fff]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {product.badge && (
                  <span
                    className="absolute top-1 left-1 text-white text-[10px] px-1.5 py-0 inline-flex items-center rounded-full font-semibold border-transparent"
                    style={{ background: '#410F3A', boxShadow: '0 0 15px #410F3A' }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-white line-clamp-2 mb-0.5 text-left leading-tight">
                {product.name}
              </p>
              <p className="text-xs text-white">{`$${Number(product.price).toFixed(2)}`}</p>
            </button>
          ))}
        </div>

        <button
          onClick={onScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all cursor-pointer bg-[#111115] text-[#E4D9AF]"
        >
          ›
        </button>
      </div>
    </div>
  );
}

ProductSimilarProducts.propTypes = {
  onProductClick: PropTypes.func,
  onScrollLeft: PropTypes.func.isRequired,
  onScrollRight: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      badge: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  scrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
