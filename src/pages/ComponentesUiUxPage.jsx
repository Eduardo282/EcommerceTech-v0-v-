import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'sonner';
import { useFilteredCatalog } from './catalog/useFilteredCatalog';
import { CatalogGridBackground } from './catalog/CatalogGridBackground';
import {
  Search,
  ArrowRight,
  Sparkles,
  Code,
  Smartphone,
  Monitor,
  COMPONENTS_DATA,
  CATEGORIES,
  getComponentPrice,
  getComponentCodeSnippet,
  renderComponentMock
} from './ComponentesUiUxPage.data';

export function ComponentesUiUxPage() {
  const { onAddToCart, onToggleWishlist, wishlistItems = [], onVentasClick } = useOutletContext();
  const {
    activeCategory,
    filteredItems: filteredComponents,
    searchQuery,
    setActiveCategory,
    setSearchQuery,
  } = useFilteredCatalog({
    items: COMPONENTS_DATA,
    initialFilter: 'todos',
    allFilter: 'todos',
    filterBy: (component, category) => component.category === category,
    searchBy: (component) => [component.title, component.description, ...component.tags],
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');

  const selectedProduct = selectedComponent
    ? {
        id: `uiux-${selectedComponent.id}`,
        name: selectedComponent.title,
        category: selectedComponent.category,
        price: getComponentPrice(selectedComponent).toFixed(2),
        originalPrice: null,
        rating: 4.8,
        reviews: 120 + selectedComponent.id * 13,
        image:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
        sales: 40 + selectedComponent.id * 7,
        badge: 'UI Kit',
        features: selectedComponent.tags,
        description: selectedComponent.description,
        longDescription: `${selectedComponent.description} Incluye variantes responsive, estados interactivos y un snippet base para integración rápida.`,
      }
    : null;

  function openComponent(component, mode = 'desktop') {
    setSelectedComponent(component);
    setPreviewMode(mode);
  }

  function handleSearchAction() {
    if (!filteredComponents.length) {
      toast.error('No se encontraron componentes para esa búsqueda');
      return;
    }

    openComponent(filteredComponents[0], 'desktop');
    toast.success(`Abriendo ${filteredComponents[0].title}`);
  }

  async function handleCopySnippet() {
    if (!selectedComponent) return;

    try {
      await navigator.clipboard.writeText(getComponentCodeSnippet(selectedComponent));
      toast.success('Snippet copiado al portapapeles');
    } catch {
      toast.error('No se pudo copiar el snippet');
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Efectos de fondo (Reutilizado del estilo de Categories.jsx) */}
      <CatalogGridBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-300">Premium UI Kit</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-white mb-2">COMPONENTES DE</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              UI/UX
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Una colección curada de componentes listos para usar en tus proyectos. Diseñados para
            impactar y optimizados para la experiencia de usuario.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-16 group">
            <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-500/30 transition-all duration-500" />
            <div className="relative bg-[#111115] border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
              <Search className="h-6 w-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Buscar componentes..."
                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchAction();
                }}
              />
              <button
                className="rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold px-8"
                onClick={handleSearchAction}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filtrar pestañas */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
                ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-amber-500/50 hover:text-amber-200'
                }
              `}
            >
              {cat.icon}
              <span className="font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Grid de componentes */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComponents.map((comp) => (
            <div
              key={comp.id}
              className="group relative bg-[#111115] rounded-3xl border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Efecto de brillo en la tarjeta */}
              <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Área de vista previa */}
              <div className="h-48 bg-[#0a0a0a] relative flex items-center justify-center border-b border-white/5 group-hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50" />
                <div className="relative p-6 rounded-2xl bg-[#1a1a1e] border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  {comp.icon}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 relative">
                <div className="flex flex-wrap gap-2 mb-4">
                  {comp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {comp.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-2">{comp.description}</p>

                <div className="flex items-center justify-between mt-auto">
                  <button
                    className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 p-0 h-auto font-medium group/btn"
                    onClick={() => openComponent(comp, 'desktop')}
                  >
                    Ver Detalles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Ver en Móvil"
                      onClick={() => openComponent(comp, 'mobile')}
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Ver en Desktop"
                      onClick={() => openComponent(comp, 'desktop')}
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Ver Código"
                      onClick={() => openComponent(comp, 'code')}
                    >
                      <Code className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-white/5 mb-4">
              <Search className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda.</p>
            <button
              className="mt-6 rounded-xl bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      {selectedComponent && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0b0b10] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
            <button
              className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm text-white transition hover:bg-white/10"
              onClick={() => setSelectedComponent(null)}
            >
              Cerrar
            </button>

            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                    {selectedComponent.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className={`rounded-xl px-3 py-2 text-xs transition ${previewMode === 'desktop' ? 'bg-white text-black' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                      onClick={() => setPreviewMode('desktop')}
                    >
                      Desktop
                    </button>
                    <button
                      className={`rounded-xl px-3 py-2 text-xs transition ${previewMode === 'mobile' ? 'bg-white text-black' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                      onClick={() => setPreviewMode('mobile')}
                    >
                      Mobile
                    </button>
                    <button
                      className={`rounded-xl px-3 py-2 text-xs transition ${previewMode === 'code' ? 'bg-white text-black' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                      onClick={() => setPreviewMode('code')}
                    >
                      Código
                    </button>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-linear-to-br from-white/[0.03] to-transparent p-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                    <span>Preview interactivo</span>
                    <span className="font-mono text-xs uppercase tracking-wide text-amber-300">
                      {previewMode}
                    </span>
                  </div>
                  <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] border border-white/5 bg-[#07070a] p-6">
                    {renderComponentMock(selectedComponent, previewMode)}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-white">
                      {selectedComponent.title}
                    </h2>
                    <p className="text-sm leading-7 text-gray-400">
                      {selectedComponent.description}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4 text-right">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Licencia</div>
                    <div className="text-2xl font-bold text-amber-300">
                      ${getComponentPrice(selectedComponent)}
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedComponent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500">
                      Compatibilidad
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">React + Tailwind</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Uso</div>
                    <div className="mt-2 text-sm font-semibold text-white">Producción</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Formato</div>
                    <div className="mt-2 text-sm font-semibold text-white">Snippet + demo</div>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <button
                    className="w-full rounded-2xl bg-amber-500 px-5 py-4 text-sm font-bold text-black transition hover:bg-amber-400"
                    onClick={() => onAddToCart(selectedProduct)}
                  >
                    Agregar al carrito
                  </button>
                  <button
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                    onClick={() => onToggleWishlist(selectedProduct)}
                  >
                    {wishlistItems.includes(selectedProduct.id)
                      ? 'Quitar de favoritos'
                      : 'Guardar en favoritos'}
                  </button>
                  <button
                    className="w-full rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/15"
                    onClick={
                      previewMode === 'code' ? handleCopySnippet : () => setPreviewMode('code')
                    }
                  >
                    {previewMode === 'code' ? 'Copiar snippet' : 'Ver código del componente'}
                  </button>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Qué incluye
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>Preview visual en variantes responsive.</li>
                    <li>Snippet base listo para integración en React.</li>
                    <li>Estados hover/focus y estructura UI consistente.</li>
                  </ul>
                </div>

                <button
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-300 transition hover:bg-white/10"
                  onClick={onVentasClick}
                >
                  Vender un componente similar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
