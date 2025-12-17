import {
  TrendingUp,
  Users,
  Globe,
  Activity,
  ArrowUpRight,
  Download,
  Box,
} from 'lucide-react';
import { Button } from '../components/ui/button';

const DASHBOARD_TEMPLATES = [
  {
    id: 1,
    title: 'FinTech Pro',
    category: 'Finance',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    size: 'large', // spans 2 cols, 2 rows
    downloads: '2.4k',
    price: '$49',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 2,
    title: 'SaaS Analytics',
    category: 'Business',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    size: 'medium', // spans 1 col, 1 row
    downloads: '1.8k',
    price: '$29',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 3,
    title: 'Users Flow',
    category: 'Traffic',
    image: null, // Plantilla widget
    icon: <Users className="h-10 w-10" />,
    size: 'small',
    downloads: '850',
    price: 'Free',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 4,
    title: 'Revenue',
    category: 'Sales',
    image: null,
    icon: <TrendingUp className="h-10 w-10" />,
    size: 'small',
    downloads: '3.1k',
    price: '$19',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 5,
    title: 'E-Commerce Admin',
    category: 'Retail',
    image:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1000&auto=format&fit=crop',
    size: 'wide', // spans 2 cols, 1 row
    downloads: '5.2k',
    price: '$59',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  {
    id: 6,
    title: 'Server Status',
    category: 'DevOps',
    image: null,
    icon: <Activity className="h-10 w-10" />,
    size: 'small',
    downloads: '900',
    price: 'Free',
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    id: 7,
    title: 'Global Reach',
    category: 'Maps',
    image: null,
    icon: <Globe className="h-10 w-10" />,
    size: 'small',
    downloads: '1.2k',
    price: '$25',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
];

export function PlantillasDashboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30">
      {/* Gradiente de fondo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size-24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header - Tecnico & Minimal */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-indigo-500"></span>
              <span className="text-indigo-400 uppercase tracking-widest text-xs font-bold">
                Analitica & Admin
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
              DASHBOARD <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
                ECO-SISTEMA
              </span>
            </h1>
            <p className="text-gray-400 max-w-lg text-lg">
              Interfaces de datos de alto rendimiento y paneles administrativos listos para producción.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="text-right hidden md:block">
              <div className="text-2xl font-bold font-mono">24</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Nuevos Items</div>
            </div>
            <div className="h-12 w-px bg-white/10 hidden md:block"></div>
            <div className="text-right hidden md:block">
              <div className="text-2xl font-bold font-mono text-emerald-400">v2.4</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Version</div>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-6">
          {DASHBOARD_TEMPLATES.map((item) => (
            <div
              key={item.id}
              className={`
                group relative rounded-3xl overflow-hidden border border-white/5 bg-[#0A0A0A] hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10
                ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${item.size === 'wide' ? 'md:col-span-2' : ''}
                ${item.size === 'medium' ? 'md:col-span-1 md:row-span-1' : ''}
                ${item.size === 'small' ? 'md:col-span-1 md:row-span-1 bg-[#0E0E12]' : ''}
              `}
            >
              {/* Renderizado de contenido basado en el tamaño/imagen */}
              {item.image ? (
                <>
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-md border ${item.color}`}
                    >
                      {item.category}
                    </div>
                    <h3
                      className={`font-bold text-white mb-2 leading-tight ${item.size === 'large' ? 'text-4xl' : 'text-2xl'}`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-bold">
                        Preview
                      </Button>
                      <span className="font-mono text-xl">{item.price}</span>
                    </div>
                  </div>
                </>
              ) : (
                // Widget Card de estilo (No imagen)
                <div className="h-full w-full p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

                  <div className="flex justify-between items-start z-10">
                    <div
                      className={`p-3 rounded-2xl ${item.color.split(' ')[0]} ${item.color.split(' ')[1]}`}
                    >
                      {item.icon}
                    </div>
                    <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>

                  <div className="z-10">
                    <div className="text-gray-500 text-sm font-medium mb-1">{item.category}</div>
                    <div className="text-2xl font-bold text-white mb-4">{item.title}</div>
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-400 border-t border-white/5 pt-4">
                      <span className="flex items-center gap-1">
                        <Download size={12} /> {item.downloads}
                      </span>
                      <span className="text-indigo-400">{item.price}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* LLamada a la accion */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="h-16 w-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
              <Box className="text-white h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Solicitar Diseño</h3>
            <p className="text-gray-500 text-sm mt-2">
              ¿Necesitas algo específico? <br /> Lo creamos para ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
