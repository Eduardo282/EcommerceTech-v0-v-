import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';

const lazyPage = (loader, exportName) =>
  lazy(() => loader().then((module) => ({ default: module[exportName] })));

const HomePage = lazyPage(() => import('./pages/HomePage'), 'HomePage');
const CategoriasPage = lazyPage(() => import('./pages/CategoriasPage'), 'CategoriasPage');
const PlantillasDashboardPage = lazyPage(
  () => import('./pages/PlantillasDashboardPage'),
  'PlantillasDashboardPage'
);
const PlantillasAuthPage = lazyPage(() => import('./pages/PlantillasAuthPage'), 'PlantillasAuthPage');
const ComponentesUiUxPage = lazyPage(() => import('./pages/ComponentesUiUxPage'), 'ComponentesUiUxPage');
const LibrosProgramacionPage = lazyPage(
  () => import('./pages/LibrosProgramacionPage'),
  'LibrosProgramacionPage'
);
const GuiasEstudioPage = lazyPage(() => import('./pages/GuiasEstudioPage'), 'GuiasEstudioPage');
const ControladoresPage = lazyPage(() => import('./pages/ControladoresPage'), 'ControladoresPage');
const NuevosLanzamientosPage = lazyPage(
  () => import('./pages/NuevosLanzamientosPage'),
  'NuevosLanzamientosPage'
);
const AyudaSoportePage = lazyPage(() => import('./pages/AyudaSoportePage'), 'AyudaSoportePage');
const RastrearPedidoPage = lazyPage(() => import('./pages/RastrearPedidoPage'), 'RastrearPedidoPage');
const PoliticaPrivacidadPage = lazyPage(
  () => import('./pages/PoliticaPrivacidadPage'),
  'PoliticaPrivacidadPage'
);
const TerminosServicioPage = lazyPage(() => import('./pages/TerminosServicioPage'), 'TerminosServicioPage');
const AdminProductsPage = lazyPage(() => import('./pages/AdminProductsPage'), 'AdminProductsPage');
const SuccessPage = lazyPage(() => import('./pages/SuccessPage'), 'SuccessPage');
const CancelPage = lazyPage(() => import('./pages/CancelPage'), 'CancelPage');

function PageFallback() {
  return <main className="min-h-screen bg-[#08080b] p-8 text-[#E4D9AF]">Cargando...</main>;
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
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
          <Route path="nuevos-lanzamientos" element={<NuevosLanzamientosPage />} />
          <Route path="ayuda-soporte" element={<AyudaSoportePage />} />
          <Route path="rastrear-pedido" element={<RastrearPedidoPage />} />
          <Route path="politica-privacidad" element={<PoliticaPrivacidadPage />} />
          <Route path="terminos-servicio" element={<TerminosServicioPage />} />
          <Route path="admin/products" element={<AdminProductsPage />} />
        </Route>

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Suspense>
  );
}
