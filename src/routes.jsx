import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HomePage } from './pages/HomePage';
import { CategoriasPage } from './pages/CategoriasPage';
import { PlantillasDashboardPage } from './pages/PlantillasDashboardPage';
import { PlantillasAuthPage } from './pages/PlantillasAuthPage';
import { ComponentesUiUxPage } from './pages/ComponentesUiUxPage';
import { LibrosProgramacionPage } from './pages/LibrosProgramacionPage';
import { GuiasEstudioPage } from './pages/GuiasEstudioPage';
import { ControladoresPage } from './pages/ControladoresPage';

export function AppRoutes({
  featuredProducts,
  trendingProducts,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            featuredProducts={featuredProducts}
            trendingProducts={trendingProducts}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlistItems={wishlistItems}
          />
        }
      />
      <Route path="/categorias" element={<CategoriasPage />} />
      <Route path="/plantillas-dashboard" element={<PlantillasDashboardPage />} />
      <Route path="/plantillas-auth" element={<PlantillasAuthPage />} />
      <Route path="/componentes-ui-ux" element={<ComponentesUiUxPage />} />
      <Route path="/libros-programacion" element={<LibrosProgramacionPage />} />
      <Route path="/guias-estudio" element={<GuiasEstudioPage />} />
      <Route path="/controladores" element={<ControladoresPage />} />
    </Routes>
  );
}

AppRoutes.propTypes = {
  featuredProducts: PropTypes.array,
  trendingProducts: PropTypes.array,
  onAddToCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};
