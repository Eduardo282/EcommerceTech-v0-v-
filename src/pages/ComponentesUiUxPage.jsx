import { useState } from 'react';
import {
  Layout,
  MousePointer,
  Type,
  Box,
  Layers,
  Search,
  ArrowRight,
  Sparkles,
  Code,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { Button } from '../components/ui/button';

// Datos estáticos para los componentes
const COMPONENTS_DATA = [
  {
    id: 1,
    title: 'Botón Neón Glow',
    description: 'Botón con efecto de resplandor neón y animación al pasar el cursor.',
    category: 'botones',
    icon: <MousePointer className="h-8 w-8 text-amber-400" />,
    tags: ['CSS', 'Animation'],
  },
  {
    id: 2,
    title: 'Tarjeta de Producto 3D',
    description: 'Tarjeta con efecto de profundidad y rotación 3D suave.',
    category: 'cards',
    icon: <Box className="h-8 w-8 text-blue-400" />,
    tags: ['3D', 'Hover'],
  },
  {
    id: 3,
    title: 'Input Flotante',
    description: 'Campo de entrada con etiqueta flotante y validación visual.',
    category: 'inputs',
    icon: <Type className="h-8 w-8 text-green-400" />,
    tags: ['Form', 'UX'],
  },
  {
    id: 4,
    title: 'Navbar Transparente',
    description: 'Barra de navegación que cambia de estilo al hacer scroll.',
    category: 'navegacion',
    icon: <Layout className="h-8 w-8 text-purple-400" />,
    tags: ['Layout', 'Responsive'],
  },
  {
    id: 5,
    title: 'Modal Glassmorphism',
    description: 'Ventana modal con efecto de vidrio esmerilado y desenfoque.',
    category: 'overlay',
    icon: <Layers className="h-8 w-8 text-pink-400" />,
    tags: ['Glass', 'Modal'],
  },
  {
    id: 6,
    title: 'Sidebar Colapsable',
    description: 'Menú lateral con animaciones suaves de colapso y expansión.',
    category: 'navegacion',
    icon: <Layout className="h-8 w-8 text-orange-400" />,
    tags: ['Menu', 'Dashboard'],
  },
  {
    id: 7,
    title: 'Loader Infinito',
    description: 'Indicador de carga animado con SVG y CSS puro.',
    category: 'feedback',
    icon: <Sparkles className="h-8 w-8 text-cyan-400" />,
    tags: ['Loading', 'SVG'],
  },
  {
    id: 8,
    title: 'Switch Toggle',
    description: 'Interruptor moderno con estados de encendido/apagado animados.',
    category: 'inputs',
    icon: <MousePointer className="h-8 w-8 text-red-400" />,
    tags: ['Form', 'Toggle'],
  },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos', icon: <Box className="h-4 w-4" /> },
  { id: 'botones', label: 'Botones', icon: <MousePointer className="h-4 w-4" /> },
  { id: 'cards', label: 'Cards', icon: <Layout className="h-4 w-4" /> },
  { id: 'inputs', label: 'Inputs', icon: <Type className="h-4 w-4" /> },
  { id: 'navegacion', label: 'Navegación', icon: <Layers className="h-4 w-4" /> },
];

export function ComponentesUiUxPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = COMPONENTS_DATA.filter((comp) => {
    const matchesCategory = activeCategory === 'todos' || comp.category === activeCategory;
    const matchesSearch =
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background Effects (Reused from Categories.jsx style) */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

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
              />
              <Button className="rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold px-8">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
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

      {/* Components Grid */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComponents.map((comp) => (
            <div
              key={comp.id}
              className="group relative bg-[#111115] rounded-3xl border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Preview Area */}
              <div className="h-48 bg-[#0a0a0a] relative flex items-center justify-center border-b border-white/5 group-hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50" />
                <div className="relative p-6 rounded-2xl bg-[#1a1a1e] border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  {comp.icon} 
                </div>
              </div>

              {/* Content */}
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
                  <Button
                    variant="ghost"
                    className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 p-0 h-auto font-medium group/btn"
                  >
                    Ver Detalles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Ver en Móvil"
                    >
                      <Smartphone className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Ver en Desktop"
                    >
                      <Monitor className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Ver Código"
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
          </div>
        )}
      </section>
    </div>
  );
}
