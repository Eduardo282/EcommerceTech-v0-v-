import { ProductCard } from './ProductCard';
import PropTypes from 'prop-types';

export function FeaturedProducts({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
  title,
  subtitle,
  config,
}) {
  const getColor = (key, fallback) => config?.[key] || fallback;

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: getColor('fondoDestacadosColor', 'black'),
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2
            className="text-4xl mb-5 font-display"
            style={{ color: getColor('titleDestacadosColor', '#FFD700') }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: getColor('descripcionDestacadosColor', '#FFD700') }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 list-none">
          {products.map((product) => (
            <li key={product.id} className="contents">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.includes(product.id)}
                allProducts={products}
                wishlistItems={wishlistItems}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

FeaturedProducts.propTypes = {
  products: PropTypes.array,
  onAddToCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  config: PropTypes.object,
};
