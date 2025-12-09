import { Hero } from '../components/Hero';
import PropTypes from 'prop-types';
import { Categories } from '../components/Categories';
import { TrustBanner } from '../components/TrustBanner';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Newsletter } from '../components/Newsletter';
import { useRubro } from '../context/useRubro';
import { RUBROS } from '../context/rubroConstants';

export function HomePage({
  featuredProducts,
  trendingProducts,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}) {
  const { rubro, isSeller } = useRubro();

  // Logic: Show GAMING only if user is a Seller AND has selected Gaming rubro.
  // Otherwise (Guest, Non-Seller, Technology Seller) -> Show TECHNOLOGY.
  const displayRubro = isSeller && rubro === RUBROS.GAMING ? RUBROS.GAMING : RUBROS.TECHNOLOGY;

  return (
    <>
      <Hero />
      <Categories />
      <TrustBanner />
      <FeaturedProducts
        products={featuredProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        title="Productos Destacados"
        subtitle="Seleccionados de la mejor calidad para tu próximo proyecto"
        rubro={displayRubro}
      />
      <FeaturedProducts
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        title="Tendencias de la Semana"
        subtitle="Los productos más populares entre nuestra comunidad"
        rubro={displayRubro}
      />
      <Newsletter />
    </>
  );
}

HomePage.propTypes = {
  featuredProducts: PropTypes.array,
  trendingProducts: PropTypes.array,
  onAddToCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};
