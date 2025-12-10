import { Hero } from '../components/Hero';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Categories } from '../components/Categories';
import { TrustBanner } from '../components/TrustBanner';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Newsletter } from '../components/Newsletter';
import { useRubro } from '../context/useRubro';
import { RUBROS } from '../context/rubroConstants';
import { getFeaturedProductsConfig } from '../services/strapi';


export function HomePage({
  featuredProducts,
  trendingProducts,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}) {

  const [featuredProductsConfig, setFeaturedProductsConfig] = useState(null);

  useEffect(() => {
    getFeaturedProductsConfig().then(setFeaturedProductsConfig);
  }, []);

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
        subtitle={featuredProductsConfig?.descripcionDestacados || 'Cargando...'}
        rubro={displayRubro}
      />
      <FeaturedProducts
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        title="Tendencias de la Semana"
        subtitle={featuredProductsConfig?.descripcionTendencias || 'Cargando...'} 
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
