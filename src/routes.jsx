import { Routes, Route } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage';
import { CategoriasPage } from './pages/CategoriasPage';
import { PlantillasDashboardPage } from './pages/PlantillasDashboardPage';
import { PlantillasAuthPage } from './pages/PlantillasAuthPage';
import { ComponentesUiUxPage } from './pages/ComponentesUiUxPage';
import { LibrosProgramacionPage } from './pages/LibrosProgramacionPage';
import { GuiasEstudioPage } from './pages/GuiasEstudioPage';
import { ControladoresPage } from './pages/ControladoresPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="plantillas-dashboard" element={<PlantillasDashboardPage />} />
        <Route path="plantillas-auth" element={<PlantillasAuthPage />} />
        <Route path="componentes-ui-ux" element={<ComponentesUiUxPage />} />
        <Route path="libros-programacion" element={<LibrosProgramacionPage />} />
        <Route path="guias-estudio" element={<GuiasEstudioPage />} />
        <Route path="controladores" element={<ControladoresPage />} />
      </Route>
    </Routes>
  );
}
