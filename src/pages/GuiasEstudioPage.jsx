import { useState } from 'react';
import {
  BookOpen,
  Code,
  Server,
  Smartphone,
  PenTool,
  Clock,
  BarChart,
  Search,
  ArrowRight,
  GraduationCap,
  PlayCircle,
  Star,
} from 'lucide-react';
import { Button } from '../components/ui/button';

// datos de las guias de estudio
const GUIDES_DATA = [
  {
    id: 1,
    title: 'Master en React Avanzado',
    description:
      'Domina patrones de diseño, hooks personalizados y optimización de rendimiento en React.',
    category: 'frontend',
    level: 'Avanzado',
    duration: '12h 30m',
    modules: 15,
    rating: 4.9,
    students: 1240,
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    tags: ['React', 'Hooks', 'Performance'],
  },
  {
    id: 2,
    title: 'Arquitectura Backend con Node.js',
    description:
      'Construye APIs escalables, seguras y robustas utilizando Node.js, Express y MongoDB.',
    category: 'backend',
    level: 'Intermedio',
    duration: '18h 15m',
    modules: 22,
    rating: 4.8,
    students: 850,
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop',
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 3,
    title: 'UI/UX Design Systems',
    description:
      'Aprende a crear sistemas de diseño coherentes y escalables para productos digitales modernos.',
    category: 'design',
    level: 'Intermedio',
    duration: '10h 45m',
    modules: 12,
    rating: 4.9,
    students: 2100,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    tags: ['Figma', 'Design Systems', 'UI/UX'],
  },
  {
    id: 4,
    title: 'DevOps: Docker & Kubernetes',
    description: 'Guía completa para contenerización y orquestación de aplicaciones en la nube.',
    category: 'devops',
    level: 'Avanzado',
    duration: '20h 00m',
    modules: 25,
    rating: 4.7,
    students: 600,
    image:
      'https://images.unsplash.com/photo-1667372393119-c81c0cda0563?q=80&w=1000&auto=format&fit=crop',
    tags: ['Docker', 'K8s', 'CI/CD'],
  },
  {
    id: 5,
    title: 'Desarrollo Móvil con Flutter',
    description: 'Crea aplicaciones nativas para iOS y Android con una sola base de código.',
    category: 'mobile',
    level: 'Principiante',
    duration: '15h 20m',
    modules: 18,
    rating: 4.8,
    students: 1500,
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop',
    tags: ['Flutter', 'Dart', 'Mobile'],
  },
  {
    id: 6,
    title: 'Fundamentos de JavaScript',
    description: 'La guía definitiva para entender los conceptos clave del lenguaje de la web.',
    category: 'frontend',
    level: 'Principiante',
    duration: '8h 50m',
    modules: 10,
    rating: 4.9,
    students: 3500,
    image:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop',
    tags: ['JavaScript', 'ES6+', 'Web'],
  },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todas', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'frontend', label: 'Frontend', icon: <Code className="h-4 w-4" /> },
  { id: 'backend', label: 'Backend', icon: <Server className="h-4 w-4" /> },
  { id: 'mobile', label: 'Mobile', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'design', label: 'Diseño', icon: <PenTool className="h-4 w-4" /> },
  { id: 'devops', label: 'DevOps', icon: <BarChart className="h-4 w-4" /> },
];

export function GuiasEstudioPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = GUIDES_DATA.filter((guide) => {
    const matchesCategory = activeCategory === 'todos' || guide.category === activeCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Efectos de fondo */}
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

      {/* Sección Hero */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-sm">
            <GraduationCap className="h-4 w-4 text-amber-400 animate-bounce" />
            <span className="text-sm font-medium text-amber-300">Academia EvoHance</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-white mb-2">GUÍAS DE</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              ESTUDIO
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rutas de aprendizaje estructuradas para potenciar tu carrera. Desde fundamentos hasta conceptos avanzados en desarrollo y diseño.
          </p>

          {/* Barra de búsqueda */}
          <div className="relative max-w-xl mx-auto mb-16 group">
            <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl group-hover:bg-amber-500/30 transition-all duration-500" />
            <div className="relative bg-[#111115] border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
              <Search className="h-6 w-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="¿Qué quieres aprender hoy?"
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

      {/* Grid de guias */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="group relative bg-[#111115] rounded-3xl border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Efecto de brillo en la tarjeta */}
              <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Area de la imagen */}
              <div className="h-56 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-[#111115] to-transparent z-10" />
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-white">{guide.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 z-20">
                  <span
                    className={`
                    text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider
                    ${
                      guide.level === 'Avanzado'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : guide.level === 'Intermedio'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }
                  `}
                  >
                    {guide.level}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 relative flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-2 text-sm">{guide.description}</p>

                <div className="mt-auto space-y-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{guide.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{guide.modules} Módulos</span>
                    </div>
                  </div>

                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold group/btn">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Empezar Guía
                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-white/5 mb-4">
              <Search className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron guías</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda.</p>
          </div>
        )}
      </section>
    </div>
  );
}
