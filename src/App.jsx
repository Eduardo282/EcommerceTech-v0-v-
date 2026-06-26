import { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/Toaster';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { CmsConfigProvider } from './context/CmsConfigContext';
import { WishlistProvider } from './context/WishlistContext';
import { useAuth } from './context/useAuth';
import { useCartContext } from './context/useCartContext';
import { useRubro } from './context/useRubro';
import { useWishlistContext } from './context/useWishlistContext';
import { useProductAggregation } from './features/products/useProductAggregation';
import { useProducts } from './features/products/useProducts';

const CartSidebar = lazy(() =>
  import('./components/CartSidebar').then((module) => ({ default: module.CartSidebar }))
);
const WishlistSidebar = lazy(() =>
  import('./components/WishlistSidebar').then((module) => ({ default: module.WishlistSidebar }))
);
const SellerOnboardingLazy = lazy(() =>
  import('./components/SellerOnboarding').then((module) => ({ default: module.SellerOnboarding }))
);
const AuthModalLazy = lazy(() =>
  import('./components/AuthModal').then((module) => ({ default: module.AuthModal }))
);
const ChatWidget = lazy(() =>
  import('./components/ChatWidget').then((module) => ({ default: module.ChatWidget }))
);
const ProductPreviewLazy = lazy(() =>
  import('./components/ProductPreview').then((module) => ({ default: module.ProductPreview }))
);

export default function App() {
  return (
    <CmsConfigProvider>
      <AuthProvider>
        <AppDataProviders />
      </AuthProvider>
    </CmsConfigProvider>
  );
}

function AppDataProviders() {
  const { rubro } = useRubro();
  const { featuredProducts, trendingProducts } = useProducts(rubro);
  const contextProductsForWishlist = useMemo(
    () => [...featuredProducts, ...trendingProducts],
    [featuredProducts, trendingProducts]
  );

  return (
    <CartProvider>
      <WishlistProvider productsContext={contextProductsForWishlist}>
        <AppShell featuredProducts={featuredProducts} trendingProducts={trendingProducts} />
      </WishlistProvider>
    </CartProvider>
  );
}

function AppShell({ featuredProducts, trendingProducts }) {
  const [previewProduct, setPreviewProduct] = useState(null);
  const {
    authOpen,
    closeAuth,
    closeGuestDrawer,
    guestDrawer,
    handleAuthSuccess,
    isAuthed,
    onboardingOpen,
    openAuth,
    requireAuth,
    setOnboardingOpen,
  } = useAuth();
  const cart = useCartContext();
  const wishlist = useWishlistContext();

  const { allProducts, productCategories, searchCatalogItems } = useProductAggregation({
    cartItems: cart.cartItems,
    featuredProducts,
    trendingProducts,
    wishlistProducts: wishlist.resolvedWishlistItems,
  });

  const handleViewProduct = useCallback(
    (product) => {
      cart.setIsCartOpen(false);
      wishlist.setIsWishlistOpen(false);
      closeGuestDrawer();
      setPreviewProduct(product);
    },
    [cart, closeGuestDrawer, wishlist]
  );

  const handleCartClick = useCallback(() => {
    if (!isAuthed) {
      requireAuth('cartView');
      return;
    }

    cart.setIsCartOpen(true);
  }, [cart, isAuthed, requireAuth]);

  const handleWishlistClick = useCallback(() => {
    if (!isAuthed) {
      requireAuth('wishlistView');
      return;
    }

    wishlist.setIsWishlistOpen(true);
  }, [isAuthed, requireAuth, wishlist]);

  return (
    <div className="min-h-screen relative">
      <Header
        cartItemsCount={cart.cartItemsCount}
        onCartClick={handleCartClick}
        onUserClick={openAuth}
        onWishlistClick={handleWishlistClick}
        productCategories={productCategories}
        searchCatalogItems={searchCatalogItems}
        wishlistItemsCount={wishlist.wishlistItemsCount}
      />

      <main className="relative" aria-label="Main content">
        <ErrorBoundary>
          <Outlet
            context={{
              featuredProducts,
              onAddToCart: cart.handleAddToCart,
              onToggleWishlist: wishlist.handleToggleWishlist,
              onVentasClick: () => {
                if (!isAuthed) {
                  requireAuth('seller');
                  return;
                }

                setOnboardingOpen(true);
              },
              onViewProduct: handleViewProduct,
              trendingProducts,
              wishlistItems: wishlist.wishlistItems,
            }}
          />
        </ErrorBoundary>
      </main>

      <Footer />

      <ErrorBoundary>
        <Suspense fallback={null}>
          <CartSidebar
            isAuthed={isAuthed}
            isOpen={(isAuthed && cart.isCartOpen) || guestDrawer === 'cart'}
            items={cart.cartItems}
            onClose={() => {
              cart.setIsCartOpen(false);
              closeGuestDrawer();
            }}
            onLoginClick={openAuth}
            onRemoveItem={cart.handleRemoveFromCart}
            onUpdateQuantity={cart.handleUpdateCartQuantity}
            onViewProduct={handleViewProduct}
          />
          <WishlistSidebar
            isAuthed={isAuthed}
            isOpen={(isAuthed && wishlist.isWishlistOpen) || guestDrawer === 'wishlist'}
            items={wishlist.resolvedWishlistItems}
            onAddToCart={cart.handleAddToCart}
            onClose={() => {
              wishlist.setIsWishlistOpen(false);
              closeGuestDrawer();
            }}
            onLoginClick={openAuth}
            onRemoveItem={wishlist.handleToggleWishlist}
            onViewProduct={handleViewProduct}
          />
          {previewProduct && (
            <ProductPreviewLazy
              allProducts={allProducts}
              isInWishlist={wishlist.wishlistItems.some(
                (productId) => String(productId) === String(previewProduct.id)
              )}
              isOpen
              key={previewProduct.id}
              onAddToCart={cart.handleAddToCart}
              onClose={() => setPreviewProduct(null)}
              onProductClick={setPreviewProduct}
              onToggleWishlist={wishlist.handleToggleWishlist}
              product={previewProduct}
            />
          )}
          <AuthModalLazy
            key={authOpen}
            onClose={closeAuth}
            onSuccess={handleAuthSuccess}
            open={authOpen}
          />
          <SellerOnboardingLazy open={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
          <ChatWidget />
        </Suspense>
      </ErrorBoundary>

      <Toaster position="bottom-right" />
    </div>
  );
}

AppShell.propTypes = {
  featuredProducts: PropTypes.array.isRequired,
  trendingProducts: PropTypes.array.isRequired,
};
