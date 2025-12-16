import { Hero } from '../components/Hero';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { TrustBanner } from '../components/TrustBanner';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { Newsletter } from '../components/Newsletter';
import { getFeaturedProductsConfig } from '../services/strapi';

export function HomePage() {
  const { featuredProducts, trendingProducts, onAddToCart, onToggleWishlist, wishlistItems } =
    useOutletContext();

  const [featuredProductsConfig, setFeaturedProductsConfig] = useState(null);

  useEffect(() => {
    getFeaturedProductsConfig().then(setFeaturedProductsConfig);
  }, []);

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
        config={featuredProductsConfig}
      />
      <FeaturedProducts
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        title="Tendencias de la Semana"
        subtitle={featuredProductsConfig?.descripcionTendencias || 'Cargando...'}
        config={featuredProductsConfig}
      />
      <Newsletter />
    </>
  );
}
