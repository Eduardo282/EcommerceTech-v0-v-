import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { TrustBanner } from "../components/TrustBanner";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Newsletter } from "../components/Newsletter";
import { useMemo } from "react";

export function HomePage({ featuredProducts, trendingProducts, onAddToCart, onToggleWishlist, wishlistItems }) {
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
      />
      <FeaturedProducts
        products={trendingProducts}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        title="Tendencias de la Semana"
        subtitle="Los productos más populares entre nuestra comunidad"
      />
      <Newsletter />
    </>
  );
}
