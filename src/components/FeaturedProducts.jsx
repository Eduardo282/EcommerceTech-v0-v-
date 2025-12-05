import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { getFeaturedProductsConfig, getProducts } from "../services/strapi";

export function FeaturedProducts({
  products: initialProducts,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
  title,
  subtitle,
}) {
  const [config, setConfig] = useState(null);
  const [strapiProducts, setStrapiProducts] = useState([]);

  useEffect(() => {
    getFeaturedProductsConfig().then(setConfig);
    getProducts().then((data) => {
      if (data && data.length > 0) {
        const mappedProducts = data.map((item) => {
          const attr = item.attributes;//quitar attributes para que los productos los agarre de strapi
          return {
            id: item.id,
            name: attr.titleProducto,
            category: attr.categoriaProducto,
            image: attr.imageProducto?.data?.attributes?.url || "", // Handle missing image
            rating: parseFloat(attr.ratingEstrellasProducto) || 0,
            reviews: attr.reseñasProducto, // Keep as string as requested
            originalPrice: parseFloat(attr.precioProducto) || 0,
            price: parseFloat(attr.descuentoProducto) || 0,
            sales: attr.descargasProducto, // Keep as string/number
            badge: attr.descuentoEtiquetaProducto,
            features: [], // Default empty or map if added later
          };
        });
        setStrapiProducts(mappedProducts);
      }
    });
  }, []);

  const getColor = (key, fallback) => config?.[key] || fallback;
  
  // Use Strapi products if available, otherwise fall back to initialProducts (mock data)
  const displayProducts = strapiProducts.length > 0 ? strapiProducts : initialProducts;

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: getColor("fondoDestacadosColor", "black"),
      }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 font-display" style={{ color: getColor("titleDestacadosColor", "#FFD700") }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg max-w-2xl mx-auto" style={{ color: getColor("descripcionDestacadosColor", "#FFD700") }}>
              {subtitle}
            </p>
          )}
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 list-none">
          {displayProducts.map((product) => (
            <li key={product.id} className="contents">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.includes(product.id)}
                allProducts={displayProducts}
                wishlistItems={wishlistItems}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
