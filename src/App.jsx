import { useState, useMemo, useEffect, lazy, Suspense, useCallback } from "react";

import { Header } from "./components/Header";
import { AppRoutes } from "./routes";
import { Footer } from "./components/Footer";

import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY, GET_ME } from "./graphql/queries";
import { RubroProvider, useRubro, RUBROS } from "./context/RubroContext";
import { ChatWidget } from "./components/ChatWidget";

const CartSidebar = lazy(() =>
  import("./components/CartSidebar").then((module) => ({
    default: module.CartSidebar,
  }))
);
const WishlistSidebar = lazy(() =>
  import("./components/WishlistSidebar").then((module) => ({
    default: module.WishlistSidebar,
  }))
);
// Note: SellerOnboarding and AuthModal are also candidates for lazy loading, 
// but let's keep them as is if they are critical for initial interaction or small enough.
// Actually, the previous plan included them. Let's re-lazy load them as requested.
const SellerOnboardingLazy = lazy(() =>
  import("./components/SellerOnboarding").then((module) => ({
    default: module.SellerOnboarding,
  }))
);
const AuthModalLazy = lazy(() =>
  import("./components/AuthModal").then((module) => ({
    default: module.AuthModal,
  }))
);

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
  const { data: authData, loading: authLoading, error: authError } = useQuery(GET_ME);
  const isAuthed = !!authData?.me;
  
  useEffect(() => {
    console.log("Auth Debug:", { isAuthed, loading: authLoading, error: authError, user: authData?.me });
  }, [isAuthed, authLoading, authError, authData]);

  // Enforce Technology for guests on app load and when logging out
  useEffect(() => {
    // Only enforce if NOT authed, NOT loading, and NO error (if error, we don't know status yet)
    if (!isAuthed && !authLoading && !authError) {
      if (rubro !== RUBROS.TECHNOLOGY) setRubro(RUBROS.TECHNOLOGY);
      setIsSeller(false);
      setStore({ name: null, description: null });
    }
  }, [isAuthed, authLoading, authError]);
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
  const handleAddToCart = useCallback(
    (product) => {
      if (!cartItems.find((item) => item.id === product.id)) {
        setCartItems((prev) => [...prev, product]);
        toast.success("Added to cart", {
          description: "Product added to your cart",
        });
      }
    },
    [cartItems]
  );

  const handleRemoveFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleToggleWishlist = useCallback(
    (productId) => {
      if (wishlistItems.includes(productId)) {
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from wishlist", {
          description: "Product removed from your favorites",
        });
      } else {
        setWishlistItems((prev) => [...prev, productId]);
        toast.success("Added to wishlist", {
          description: "Product added to your favorites",
        });
      }
    },
    [wishlistItems]
  );
  return (
    <div className="min-h-screen relative">
      <title>EvoHance Marketplace - Diseño Ecommerce Profesional</title>
      <meta
        name="description"
        content="Descubre los mejores recursos de diseño ecommerce, plantillas y herramientas para potenciar tu tienda online. Calidad garantizada por EvoHance."
      />
      <meta
        name="keywords"
        content="ecommerce, diseño web, plantillas, ui kits, react, tailwind, marketplace"
      />
      <meta property="og:title" content="EvoHance Marketplace" />
      <meta
        property="og:description"
        content="Tu destino para diseño ecommerce profesional y recursos de alta calidad."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://evohance.com/" />
      <meta
        property="og:image"
        content="https://evohance.com/og-image.jpg"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="EvoHance Marketplace" />
      <meta
        name="twitter:description"
        content="Diseño ecommerce profesional y recursos de alta calidad."
      />
      <meta
        name="twitter:image"
        content="https://evohance.com/og-image.jpg"
      />
      <div className="relative z-10">
        <Header
          onCartClick={() => setIsCartOpen(true)}
          cartItemsCount={cartItems.length}
          onWishlistClick={() => setIsWishlistOpen(true)}
          wishlistItemsCount={wishlistItems.length}
          onUserClick={() => setAuthOpen(true)}
        />
        <main className="relative" aria-label="Main content">
          <AppRoutes
            featuredProducts={featuredProducts}
            trendingProducts={trendingProducts}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
          />
        </main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
        />
        <WishlistSidebar
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          items={Array.from(
            new Map(
              [...featuredProducts, ...trendingProducts]
                .filter((product) => wishlistItems.includes(product.id))
                .map((product) => [product.id, product])
            ).values()
          )}
          onRemoveItem={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />
      </Suspense>
      <Toaster position="bottom-right" />
      <Suspense fallback={null}>
        <AuthModalLazy
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
        <SellerOnboardingLazy
          open={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
        />
        <ChatWidget />
      </Suspense>
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
