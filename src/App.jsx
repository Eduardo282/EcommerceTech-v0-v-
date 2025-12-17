import { useState, useMemo, useEffect, lazy, Suspense, useCallback } from 'react';

import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY, GET_ME } from './graphql/queries';
import { useRubro } from './context/useRubro';
import { RUBROS } from './context/rubroConstants';
import { ChatWidget } from './components/ChatWidget';

const CartSidebar = lazy(() =>
  import('./components/CartSidebar').then((module) => ({
    default: module.CartSidebar,
  }))
);
const WishlistSidebar = lazy(() =>
  import('./components/WishlistSidebar').then((module) => ({
    default: module.WishlistSidebar,
  }))
);
const SellerOnboardingLazy = lazy(() =>
  import('./components/SellerOnboarding').then((module) => ({
    default: module.SellerOnboarding,
  }))
);
const AuthModalLazy = lazy(() =>
  import('./components/AuthModal').then((module) => ({
    default: module.AuthModal,
  }))
);

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop'; //es un zapato rojo

function mapProduct(p) {
  return {
    id: p.id,
    name: p.title,
    category: p?.category?.name || 'General',
    price: (p.descuentoPrice ? p.descuentoPrice : p.originalPrice || 0).toFixed(2),
    originalPrice: p.descuentoPrice ? (p.originalPrice || 0).toFixed(2) : null,
    rating: typeof p.rating === 'number' ? p.rating : 0,
    reviews: p.rating ? Math.floor(p.rating * 500) : 0,
    image: (p.images && p.images[0]) || FALLBACK_IMAGE,
    sales: 0,
    badge: p.descuentoPrice ? 'Oferta' : p.badge, // Auto etiqueta si hay descuento? O usar p.badge.
    features: p.features || (p.attributes ? Object.keys(p.attributes).slice(0, 3) : undefined),
    descuentoPrice: p.descuentoPrice,
    rubro: p.rubro,
    details: p.details,
    specs: p.specs,
    includes: p.includes,
    description: p.description,
    longDescription: p.longDescription,
  };
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  /*
   * MOVIDO A MAIN/CONTEXT: La lógica de autenticación/rubro idealmente debería permanecer aquí o moverse a un Contexto/Hook, si depende de la interfaz de usuario. 
  
  Pero como se eliminó RubroProvider de App.jsx, podemos consumirlo aquí porque App ahora es hijo de RubroProvider en main.jsx.
   */
  const { rubro, setRubro, setIsSeller, setStore } = useRubro();

  const { data: authData, loading: authLoading, error: authError } = useQuery(GET_ME);
  const isAuthed = !!authData?.me; // false o true

  useEffect(() => {
    console.log('Auth Debug:', {
      isAuthed,
      loading: authLoading,
      error: authError,
      user: authData?.me,
    });
  }, [isAuthed, authLoading, authError, authData]);

  // Aplicar tecnology a los invitados al cargar la aplicación y al cerrar sesión
  useEffect(() => {
    // Solo se aplica si NO está autorizado, NO se está cargando y NO hay error (si hay error, aún no conocemos el estado)
    if (!isAuthed && !authLoading && !authError) {
      if (rubro !== RUBROS.TECHNOLOGY) setRubro(RUBROS.TECHNOLOGY);
      setIsSeller(false);
      setStore({ name: null, description: null });
    }
  }, [isAuthed, authLoading, authError, rubro, setIsSeller, setRubro, setStore]);

  // GraphQL: productos destacados (por rating)
  const { data: featuredData } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: 'RATING_DESC',
      pagination: { page: 1, pageSize: 8 },
      filter: { rubro },
    },
    fetchPolicy: 'cache-first',
  });

  // GraphQL: productos populares (nuevos)
  const { data: trendingData } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: 'NEWEST',
      pagination: { page: 1, pageSize: 12 },
      filter: { rubro },
    },
    fetchPolicy: 'cache-first',
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
        toast.success('Agregado al carrito', {
          description: 'Producto agregado a su carrito',
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
        toast.success('Removido de favoritos', {
          description: 'Producto removido de sus favoritos',
        });
      } else {
        setWishlistItems((prev) => [...prev, productId]);
        toast.success('Añadido a favoritos', {
          description: 'Producto añadido a sus favoritos',
        });
      }
    },
    [wishlistItems]
  );

  return (
    <div className="min-h-screen relative">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.length}
        onWishlistClick={() => setIsWishlistOpen(true)}
        wishlistItemsCount={wishlistItems.length}
        onUserClick={() => setAuthOpen(true)}
      />

      <main className="relative" aria-label="Main content">
        <Outlet
          context={{
            featuredProducts,
            trendingProducts,
            onAddToCart: handleAddToCart,
            onToggleWishlist: handleToggleWishlist,
            wishlistItems,
            //se agregan mas conforme a paginas agregadas (para traer contexto de productos, etc...)
          }}
        />

        {/* <>
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
            </> */}
      </main>

      <Footer />

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
          key={authOpen}
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={({ mode, wantsSeller, userName, user } = {}) => {
            setAuthOpen(false);
            // Si el usuario es vendedor, lo redirigimos a la tienda
            if (user?.isSeller) {
              if (user?.rubro) setRubro(user.rubro);
              setIsSeller(true);
              setStore({
                name: user?.storeName || null,
                description: user?.storeDescription || null,
              });
            } else if ((mode === 'login' || mode === 'register') && user) {
              // Si el usuario no es vendedor, lo redirigimos a la tienda
              if (!wantsSeller) {
                setRubro(RUBROS.TECHNOLOGY);
                setIsSeller(false);
                setStore({ name: null, description: null });
              }
            }
            if (mode === 'register' && wantsSeller && !user?.isSeller) {
              // Si el usuario quiere ser vendedor, lo redirigimos a la tienda
              setOnboardingOpen(true);
            } else {
              toast.success(`Bienvenido ${userName || ''}!`, {
                description:
                  mode === 'login' ? "Has iniciado sesión" : 'Tu cuenta ha sido creada',
              });
            }
          }}
        />
        <SellerOnboardingLazy open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
        <ChatWidget />
      </Suspense>
    </div>
  );
}
