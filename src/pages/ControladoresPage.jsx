import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductPreviewDialog } from '../components/ProductPreviewDialog';
import { useFilteredCatalog } from './catalog/useFilteredCatalog';
import {
  Download,
  Search,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Filter,
  DRIVERS_DATA,
  mapDriverToProduct
} from './ControladoresPage.data';
import { getSearchQueryFromParams } from '../lib/catalogSearch';
import { useSearchHighlight } from '../hooks/useSearchHighlight';

export function ControladoresPage() {
  const { onAddToCart, onToggleWishlist, wishlistItems = [] } = useOutletContext();
  const [searchParams] = useSearchParams();
  const urlSearchQuery = getSearchQueryFromParams(searchParams);
  const highlightedProductId = searchParams.get('highlight');
  const {
    activeCategory: selectedOS,
    filteredItems: filteredDrivers,
    searchQuery: searchTerm,
    setActiveCategory: setSelectedOS,
    setSearchQuery: setSearchTerm,
  } = useFilteredCatalog({
    items: DRIVERS_DATA,
    initialFilter: 'All',
    allFilter: 'All',
    filterBy: (driver, os) =>
      driver.os === os ||
      (os === 'Windows 10' && driver.os.includes('Windows 10')) ||
      (os === 'Windows 11' && driver.os.includes('Windows 11')),
    searchBy: (driver) => [driver.id, driver.name, driver.type],
  });
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    if (!urlSearchQuery) return;
    setSelectedOS('All');
    setSearchTerm(urlSearchQuery);
  }, [setSearchTerm, setSelectedOS, urlSearchQuery]);

  useSearchHighlight(highlightedProductId, filteredDrivers.length);

  const allDriverProducts = useMemo(() => DRIVERS_DATA.map(mapDriverToProduct), []);
  const selectedProduct = selectedDriver ? mapDriverToProduct(selectedDriver) : null;

  function handleSearchAction() {
    if (!filteredDrivers.length) {
      toast.error('No se encontraron controladores para esa búsqueda');
      return;
    }

    setSelectedDriver(filteredDrivers[0]);
    toast.success(`Abriendo ${filteredDrivers[0].name}`);
  }

  return (
    <div className="min-h-screen bg-[#0D0D10] text-[#E0E0E0] font-mono">
      {/* Banner superior - Estilo advertencia/Información */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-500 flex items-center justify-center gap-2">
        <AlertCircle className="h-3.5 w-3.5" />
        <span>ASEGURATE DE LA COMPATIBILIDAD DEL SISTEMA ANTES DE FLASHAR EL FIRMWARE.</span>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Sección de encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <Terminal className="text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">DRIVERS & FIRMWARE</h1>
                <p className="text-xs text-gray-500">REPOSITORIO OFICIAL // ÍNDICE V.3.0</p>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="flex gap-6 text-xs text-gray-500 border border-white/5 rounded-lg p-3 bg-black/20">
            <div className="text-center">
              <div className="text-emerald-500 font-bold mb-0.5">ONLINE</div>
              <div>Estado del sistema</div>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-white font-bold mb-0.5">5.2TB</div>
              <div>Total de ancho de banda</div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtro */}
        <div className="bg-[#15151A] border border-white/5 rounded-t-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por ID o nombre del hardware..."
              className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:text-white transition-colors placeholder:text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchAction();
              }}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter size={14} className="text-gray-500" />
            {['All', 'Windows 11', 'Windows 10', 'Linux', 'BIOS'].map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`
                  px-3 py-1.5 rounded text-xs font-medium border transition-colors whitespace-nowrap
                  ${
                    selectedOS === os
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'
                  }
                `}
              >
                {os}
              </button>
            ))}
            <button
              onClick={handleSearchAction}
              className="px-3 py-1.5 rounded text-xs font-medium border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/15 whitespace-nowrap"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Tabla de datos */}
        <div id="catalog-results" className="bg-[#15151A] border border-white/5 border-t-0 rounded-b-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0A0A0D] text-gray-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Nombre del dispositivo</th>
                  <th className="px-6 py-4 font-medium">Version</th>
                  <th className="px-6 py-4 font-medium">OS</th>
                  <th className="px-6 py-4 font-medium">Tamaño</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium">Actualizado</th>
                  <th className="px-6 py-4 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDrivers.map((driver) => (
                  <tr
                    key={driver.id}
                    data-search-id={`driver-${driver.id}`}
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                    onClick={() => setSelectedDriver(driver)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-black/40 rounded border border-white/5 group-hover:border-white/20 transition-colors">
                          {driver.icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-200">{driver.name}</div>
                          <div className="text-xs text-gray-600">{driver.id.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400">{driver.version}</td>
                    <td className="px-6 py-4 text-gray-400">{driver.os}</td>
                    <td className="px-6 py-4 text-gray-500">{driver.size}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`
                        inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                        ${
                          driver.status === 'Stable'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : driver.status === 'Beta'
                              ? 'bg-red-500/10 text-red-500 border-red-500/20'
                              : driver.status === 'Critical'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                        }
                      `}
                      >
                        {driver.status === 'Stable' && (
                          <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                        )}
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{driver.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(mapDriverToProduct(driver));
                        }}
                      >
                        <Download className="mr-2 inline h-3.5 w-3.5" />
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDrivers.length === 0 && (
            <div className="px-6 py-14 text-center">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/30 p-4">
                <Search className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">No se encontraron controladores</h3>
              <p className="text-sm text-gray-500">
                Ajusta el término de búsqueda o cambia el filtro de sistema operativo.
              </p>
              <button
                className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-white hover:bg-white/10"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedOS('All');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Pie de paginación */}
          <div className="bg-[#0A0A0D] p-4 text-center border-t border-white/5 text-xs text-gray-600">
            Mostrando {filteredDrivers.length} de {DRIVERS_DATA.length} controladores disponibles
          </div>
        </div>
      </div>

      <ProductPreviewDialog
        product={selectedProduct}
        onClose={() => setSelectedDriver(null)}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        allProducts={allDriverProducts}
        onProductClick={(product) => {
          const matchedDriver = DRIVERS_DATA.find((driver) => `driver-${driver.id}` === product.id);
          if (matchedDriver) setSelectedDriver(matchedDriver);
        }}
      />
    </div>
  );
}
