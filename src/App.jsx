import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { useQuery } from '@apollo/client';
import { GET_ME } from './graphql/queries';

import { RUBROS } from './context/rubroConstants';

import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/Toaster';

import { useRubro } from './context/useRubro';
import { useCart } from './features/cart/useCart';
import { useWishlist } from './features/wishlist/useWishlist';
import { useProducts } from './features/products/useProducts';
import { buildDynamicProductSearchItems } from './lib/catalogSearch';

// Lazy loading modals and sidebars
const CartSidebar = lazy(() => import('./components/CartSidebar').then((module) => ({ default: module.CartSidebar })));
const WishlistSidebar = lazy(() => import('./components/WishlistSidebar').then((module) => ({ default: module.WishlistSidebar })));
const SellerOnboardingLazy = lazy(() => import('./components/SellerOnboarding').then((module) => ({ default: module.SellerOnboarding })));
const AuthModalLazy = lazy(() => import('./components/AuthModal').then((module) => ({ default: module.AuthModal })));
const ChatWidget = lazy(() => import('./components/ChatWidget').then((module) => ({ default: module.ChatWidget })));
const ProductPreviewLazy = lazy(() => import('./components/ProductPreview').then((module) => ({ default: module.ProductPreview })));

export default function App() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [guestDrawer, setGuestDrawer] = useState(null);

  // Hook global del Rubro y contexto
  const { rubro, setRubro, setIsSeller, setStore } = useRubro();
  
  // Lógica de Autenticación
  const { data: authData, loading: authLoading, error: authError } = useQuery(GET_ME);
  const isAuthed = !!authData?.me;
  const userId = authData?.me?.id ?? null;

  // Forzar un rubro a invitados
  useEffect(() => {
    if (!isAuthed && !authLoading && !authError) {
      if (rubro !== RUBROS.TECHNOLOGY) setRubro(RUBROS.TECHNOLOGY);
      setIsSeller(false);
      setStore({ name: null, description: null });
    }
  }, [isAuthed, authLoading, authError, rubro, setIsSeller, setRubro, setStore]);

  // Manejo de productos via GraphQL
  const { featuredProducts, trendingProducts } = useProducts(rubro);

  // Helpers de inyección para custom hooks
  const requireAuth = useCallback((reason = 'default') => {
    if (reason === 'cart' || reason === 'cartView') {
      setGuestDrawer('cart');
      return;
    }

    if (reason === 'wishlist' || reason === 'wishlistView') {
      setGuestDrawer('wishlist');
      return;
    }

    const messageByReason = {
      seller: {
        title: 'Inicia sesión para vender productos',
        description: 'Necesitás una cuenta para administrar tus publicaciones.',
      },
      default: {
        title: 'Inicia sesión para continuar',
        description: 'Tu cuenta nos permite guardar tu actividad y preferencias.',
      },
    };
    const message = messageByReason[reason] || messageByReason.default;

    toast.info(message.title, { description: message.description });
    if (reason === 'seller') return;

    setAuthOpen(true);
  }, []);
  const contextProductsForWishlist = useMemo(() => [...featuredProducts, ...trendingProducts], [featuredProducts, trendingProducts]);

  // Inicializar Custom Hooks de negocio puro
  const cart = useCart(userId, authLoading, isAuthed, requireAuth);
  const wishlist = useWishlist(userId, authLoading, isAuthed, requireAuth, contextProductsForWishlist);

  const cartItemsCount = useMemo(() => {
    return cart.cartItems.reduce(
      (total, item) => total + (Number(item.quantity) || 1),
      0
    );
  }, [cart.cartItems]);

  const allProducts = useMemo(() => {
    const products = [
      ...featuredProducts,
      ...trendingProducts,
      ...wishlist.resolvedWishlistItems,
      ...cart.cartItems,
    ];
    return Array.from(
      new Map(products.filter(Boolean).map((product) => [String(product.id), product])).values()
    );
  }, [cart.cartItems, featuredProducts, wishlist.resolvedWishlistItems, trendingProducts]);

  const searchCatalogItems = useMemo(() => {
    const dynamicItems = buildDynamicProductSearchItems(allProducts);

    return Array.from(
      new Map(dynamicItems.map((item) => [`${item.path}:${item.id}`, item])).values()
    );
  }, [allProducts]);

  const productCategories = useMemo(() => {
    const uniqueProducts = new Map(
      [...featuredProducts, ...trendingProducts]
        .filter(Boolean)
        .map((product) => [String(product.id), product])
    );
    const categoryCounts = new Map();

    uniqueProducts.forEach((product) => {
      const categoryName = product.category?.trim();
      if (!categoryName) return;

      categoryCounts.set(categoryName, (categoryCounts.get(categoryName) || 0) + 1);
    });

    return Array.from(categoryCounts, ([name, productCount]) => ({
      name,
      productCount,
    })).sort((categoryA, categoryB) =>
      categoryA.name.localeCompare(categoryB.name, 'es', { sensitivity: 'base' })
    );
  }, [featuredProducts, trendingProducts]);

  const handleViewProduct = useCallback((product) => {
    cart.setIsCartOpen(false);
    wishlist.setIsWishlistOpen(false);
    setPreviewProduct(product);
  }, [cart, wishlist]);

  const handleCartClick = useCallback(() => {
    if (!isAuthed) {
      setGuestDrawer('cart');
      return;
    }

    cart.setIsCartOpen(true);
  }, [cart, isAuthed]);

  const handleWishlistClick = useCallback(() => {
    if (!isAuthed) {
      setGuestDrawer('wishlist');
      return;
    }

    wishlist.setIsWishlistOpen(true);
  }, [isAuthed, wishlist]);

  const handleAuthSuccess = useCallback(({ mode, wantsSeller, userName, user } = {}) => {
    setAuthOpen(false);
    setGuestDrawer(null);
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
      setOnboardingOpen(true);
    } else {
      toast.success(`Bienvenido ${userName || ''}!`, {
        description: mode === 'login' ? 'Has iniciado sesión' : 'Tu cuenta ha sido creada',
      });
    }
  }, [setRubro, setIsSeller, setStore, setAuthOpen, setOnboardingOpen]);

  return (
    <div className="min-h-screen relative">
      <Header
        onCartClick={handleCartClick}
        cartItemsCount={cartItemsCount}
        onWishlistClick={handleWishlistClick}
        wishlistItemsCount={wishlist.resolvedWishlistItems.length}
        onUserClick={() => setAuthOpen(true)}
        productCategories={productCategories}
        searchCatalogItems={searchCatalogItems}
      />

      <main className="relative" aria-label="Main content">
        <Outlet
          context={{
            featuredProducts,
            trendingProducts,
            onAddToCart: cart.handleAddToCart,
            onToggleWishlist: wishlist.handleToggleWishlist,
            wishlistItems: wishlist.wishlistItems,
            onVentasClick: () => {
              if (!isAuthed) {
                requireAuth('seller');
              } else {
                setOnboardingOpen(true);
              }
            },
          }}
        />
      </main>

      <Footer />

      <Suspense fallback={null}>
        <CartSidebar
          isOpen={(isAuthed && cart.isCartOpen) || guestDrawer === 'cart'}
          onClose={() => {
            cart.setIsCartOpen(false);
            setGuestDrawer(null);
          }}
          items={cart.cartItems}
          onRemoveItem={cart.handleRemoveFromCart}
          onUpdateQuantity={cart.handleUpdateCartQuantity}
          onViewProduct={handleViewProduct}
          isAuthed={isAuthed}
          onLoginClick={() => setAuthOpen(true)}
        />
        <WishlistSidebar
          isOpen={(isAuthed && wishlist.isWishlistOpen) || guestDrawer === 'wishlist'}
          onClose={() => {
            wishlist.setIsWishlistOpen(false);
            setGuestDrawer(null);
          }}
          items={wishlist.resolvedWishlistItems}
          onRemoveItem={wishlist.handleToggleWishlist}
          onAddToCart={cart.handleAddToCart}
          onViewProduct={handleViewProduct}
          isAuthed={isAuthed}
          onLoginClick={() => setAuthOpen(true)}
        />
        {previewProduct && (
          <ProductPreviewLazy
            key={previewProduct.id}
            product={previewProduct}
            isOpen
            onClose={() => setPreviewProduct(null)}
            onAddToCart={cart.handleAddToCart}
            onToggleWishlist={wishlist.handleToggleWishlist}
            isInWishlist={wishlist.wishlistItems.some(
              (productId) => String(productId) === String(previewProduct.id)
            )}
            allProducts={allProducts}
            onProductClick={setPreviewProduct}
          />
        )}
        <AuthModalLazy
          key={authOpen}
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
        <SellerOnboardingLazy open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
        <ChatWidget />
      </Suspense>

      <Toaster position="bottom-right" />
    </div>
  );
}
