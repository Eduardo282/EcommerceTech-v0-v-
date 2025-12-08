import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { getFeaturedProductsConfig } from "../services/strapi";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($rubro: Rubro) {
    products(filter: { rubro: $rubro }, pagination: { pageSize: 100 }) {
      id
      title
      price
      originalPrice
      rating
      images
      category {
        name
      }
      features
      badge
      rubro
    }
  }
`;

export function FeaturedProducts({
  products: initialProducts,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
  title,
  subtitle,
  rubro,
}) {
  console.log("FeaturedProducts rubro:", rubro);
  const [config, setConfig] = useState(null);
  const { data: graphqlData, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { rubro },
    skip: !rubro,
    onCompleted: (data) => console.log("Query completed for rubro:", rubro, "Products:", data?.products?.length)
  });

  if (error) console.error("GraphQL Error:", error);

  useEffect(() => {
    getFeaturedProductsConfig().then(setConfig);
  }, []);

  const getColor = (key, fallback) => config?.[key] || fallback;
  
  // Map GraphQL products to component format
  const displayProducts = graphqlData?.products?.map((item) => ({
    id: item.id,
    name: item.title,
    category: item.category?.name || "General",
    image: item.images?.[0] || "",
    rating: item.rating || 0,
    reviews: "0 reseñas", // Placeholder as review count isn't in GraphQL yet
    originalPrice: typeof item.originalPrice === 'number' ? item.originalPrice : parseFloat(item.originalPrice) || 0,
    price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0,
    sales: 0, // Placeholder
    badge: item.badge,
    features: item.features || [],
    rubro: item.rubro,
  })) || initialProducts;

  // Client-side safety filter: if rubro prop is provided, ensure we only show matching products
  const filteredProducts = rubro 
    ? displayProducts.filter(p => !p.rubro || p.rubro === rubro)
    : displayProducts;

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
          {filteredProducts.map((product) => (
            <li key={product.id} className="contents">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.includes(product.id)}
                allProducts={filteredProducts}
                wishlistItems={wishlistItems}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
