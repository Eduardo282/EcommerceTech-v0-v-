import { useState, useMemo, useEffect } from "react";
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
import { RubroProvider, useRubro, RUBROS } from "./context/RubroContext";
import { SellerOnboarding } from "./components/SellerOnboarding";
import { AuthModal } from "./components/AuthModal";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop"; //es un zapato rojo

function mapProduct(p) {
  return {
    id: p.id,
    name: p.title,
    category: p?.category?.name || "General",
    price: p.price.toFixed(2),
    originalPrice: (p.price * 1.5).toFixed(2),
    rating: typeof p.rating === "number" ? p.rating : 4.5,
    reviews: Math.max(0, Math.floor((p.rating || 4.5) * 500)),
    image: (p.images && p.images[0]) || FALLBACK_IMAGE,
    sales: 0,
    features: p.attributes ? Object.keys(p.attributes).slice(0, 3) : undefined,
  };
}

function AppInner() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { rubro, setRubro, setIsSeller, setStore } = useRubro();
  const [isAuthed, setIsAuthed] = useState(
    () => !!localStorage.getItem("auth.token")
  );

  // Keep an eye on auth changes
  useEffect(() => {
    const handler = () => setIsAuthed(!!localStorage.getItem("auth.token"));
    window.addEventListener("auth:changed", handler);
    return () => window.removeEventListener("auth:changed", handler);
  }, []);

  // Enforce Technology for guests on app load and when logging out
  useEffect(() => {
    if (!isAuthed) {
      if (rubro !== RUBROS.TECHNOLOGY) setRubro(RUBROS.TECHNOLOGY);
      setIsSeller(false);
      setStore({ name: null, description: null });
    }
  }, [isAuthed]);

  // GraphQL: Featured (by rating)
  const {
    data: featuredData,
    loading: featuredLoading,
    error: featuredError,
  } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: "RATING_DESC",
      pagination: { page: 1, pageSize: 8 },
      filter: { rubro },
    },
    fetchPolicy: "cache-first",
  });

  // GraphQL: Trending (newest)
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: "NEWEST",
      pagination: { page: 1, pageSize: 12 },
      filter: { rubro },
    },
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
      <div className="relative z-10">
        <Header
          onCartClick={() => setIsCartOpen(true)}
          cartItemsCount={cartItems.length}
          onWishlistClick={() => setIsWishlistOpen(true)}
          wishlistItemsCount={wishlistItems.length}
          onUserClick={() => setAuthOpen(true)}
        />

        <main className="relative" aria-label="Main content">
          <Hero />
          <Categories />
          <TrustBanner />

          <FeaturedProducts
            products={featuredProducts}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            title="Productos Destacados"
            subtitle="Seleccionados de la mejor calidad para tu próximo proyecto"
          />

          <FeaturedProducts
            products={trendingProducts}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            title="Tendencias de la Semana"
            subtitle="Los productos más populares entre nuestra comunidad"
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

      <Toaster position="bottom-right" />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={({ mode, wantsSeller, userName, user } = {}) => {
          setAuthOpen(false);
          // If backend already knows user is a seller, hydrate immediately
          if (user?.isSeller) {
            if (user?.rubro) setRubro(user.rubro);
            setIsSeller(true);
            setStore({
              name: user?.storeName || null,
              description: user?.storeDescription || null,
            });
          } else if ((mode === "login" || mode === "register") && user) {
            // Non-seller auth (login or register): force default Technology rubro & non-seller state
            if (!wantsSeller) {
              setRubro(RUBROS.TECHNOLOGY);
              setIsSeller(false);
              setStore({ name: null, description: null });
            }
          }
          if (mode === "register" && wantsSeller && !user?.isSeller) {
            // open onboarding only if they opted in and are not yet a seller
            setOnboardingOpen(true);
          } else {
            toast.success(`Welcome ${userName || ""}!`, {
              description:
                mode === "login"
                  ? "You're now logged in"
                  : "Your account has been created",
            });
          }
        }}
      />
      <SellerOnboarding
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <RubroProvider>
      <AppInner />
    </RubroProvider>
  );
}
