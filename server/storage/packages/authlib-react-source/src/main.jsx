import { createRoot } from 'react-dom/client';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PlantillasAuthPage } from './PlantillasAuthPage';
import './index.css';

function PreviewLayout() {
  return <Outlet context={{}} />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<PreviewLayout />}>
        <Route index element={<PlantillasAuthPage />} />
      </Route>
    </Routes>
    <Toaster position="bottom-right" richColors />
  </BrowserRouter>
);
