import { useState, useMemo } from "react";
import { SpaceBackground } from "./components/SpaceBackground";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { TrustBanner } from "./components/TrustBanner";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { CartSidebar } from "./components/CartSidebar";
import { WishlistSidebar } from "./components/WishlistSidebar";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "./graphql/queries";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop";

function mapProduct(p) {
  return {
    id: p.id,
    name: p.title,
    category: p?.category?.name || "General",
    price: p.price,
    originalPrice: Math.round(p.price * 1.5),
    rating: typeof p.rating === "number" ? p.rating : 4.5,
    reviews: Math.max(0, Math.floor((p.rating || 4.5) * 500)),
    image: (p.images && p.images[0]) || FALLBACK_IMAGE,
    sales: 0,
    features: p.attributes ? Object.keys(p.attributes).slice(0, 3) : undefined,
  };
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // GraphQL: Featured (by rating)
  const {
    data: featuredData,
    loading: featuredLoading,
    error: featuredError,
  } = useQuery(PRODUCTS_QUERY, {
    variables: { sort: "RATING_DESC", pagination: { page: 1, pageSize: 8 } },
    fetchPolicy: "cache-first",
  });

  // GraphQL: Trending (newest)
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useQuery(PRODUCTS_QUERY, {
    variables: { sort: "NEWEST", pagination: { page: 1, pageSize: 12 } },
    fetchPolicy: "cache-first",
  });

  const featuredProducts = useMemo(
    () => (featuredData?.products || []).map(mapProduct),
    [featuredData]
  );
  const trendingProducts = useMemo(
    () => (trendingData?.products || []).map(mapProduct),
    [trendingData]
  );

  const handleAddToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
      setIsCartOpen(true);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (productId) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId));
      toast.success("Removed from wishlist", {
        description: "Product removed from your favorites",
      });
    } else {
      setWishlistItems([...wishlistItems, productId]);
      toast.success("Added to wishlist", {
        description: "Product added to your favorites",
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />

      <div className="relative z-10">
        <Header
          onCartClick={() => setIsCartOpen(true)}
          cartItemsCount={cartItems.length}
          onWishlistClick={() => setIsWishlistOpen(true)}
          wishlistItemsCount={wishlistItems.length}
        />

        <main className="relative">
          <Hero />
          <Categories />
          <TrustBanner />

          <FeaturedProducts
            products={featuredProducts}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            title="Featured Products"
            subtitle="Hand-picked premium products for your next project"
          />

          <FeaturedProducts
            products={trendingProducts}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            title="Trending This Week"
            subtitle="Most popular products among our community"
          />

          <Newsletter />
        </main>

        <Footer />
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />

      <WishlistSidebar
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={[...featuredProducts, ...trendingProducts].filter((product) =>
          wishlistItems.includes(product.id)
        )}
        onRemoveItem={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
