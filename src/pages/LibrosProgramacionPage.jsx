import { useState } from 'react';
const Book = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const Search = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const ShoppingCart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const Heart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
const Zap = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const Award = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);
const BookOpen = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const Coffee = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);
const Terminal = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

// datos de los libros
const BOOKS_DATA = [
  {
    id: 1,
    title: 'Clean Code: A Handbook',
    author: 'Robert C. Martin',
    price: 45.99,
    rating: 4.9,
    reviews: 3200,
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
    category: 'Software Engineering',
    badge: 'Best Seller',
    description:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    price: 39.99,
    rating: 4.8,
    reviews: 2100,
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop',
    category: 'Career',
    badge: 'Classic',
    description: 'Your journey to mastery. The classic guide to becoming a better programmer.',
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 29.99,
    rating: 4.5,
    reviews: 1500,
    image:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop',
    category: 'JavaScript',
    badge: null,
    description: 'Unearthing the rugged nature of JavaScript and its elegant parts.',
  },
  {
    id: 4,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    price: 55.0,
    rating: 5.0,
    reviews: 5000,
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
    category: 'Architecture',
    badge: 'Must Read',
    description: 'The big ideas behind reliable, scalable, and maintainable systems.',
  },
  {
    id: 5,
    title: "You Don't Know JS",
    author: 'Kyle Simpson',
    price: 35.5,
    rating: 4.7,
    reviews: 1800,
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop',
    category: 'JavaScript',
    badge: 'Deep Dive',
    description:
      'A series of books diving deep into the core mechanisms of the JavaScript language.',
  },
  {
    id: 6,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    price: 85.0,
    rating: 4.6,
    reviews: 1200,
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop',
    category: 'Computer Science',
    badge: 'Academic',
    description: 'The bible of algorithms. Comprehensive and rigorous.',
  },
];

const CATEGORIES = [
  'Todos',
  'Software Engineering',
  'JavaScript',
  'Architecture',
  'Career',
  'Computer Science',
];

export function LibrosProgramacionPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS_DATA.filter((book) => {
    const matchesCategory = activeCategory === 'Todos' || book.category === activeCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30">
      {/* Efectos de fondo (Consistente con otras páginas) */}
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

      {/* Sección Hero - Diseño único: Dividido con tipografía grande y sugerencia de elemento 3D */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Formas de fondo abstractas - Tema naranja */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-400 text-sm font-semibold tracking-wide uppercase">
              <Terminal size={14} />
              <span>Librería de Programación</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
              LEER. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-amber-500 to-orange-600">
                CODIFICAR.
              </span>{' '}
              <br />
              REPETIR.
            </h1>

            <p className="text-xl text-gray-400 max-w-lg leading-relaxed border-l-4 border-amber-500 pl-6">
              La colección definitiva de libros para desarrolladores que buscan la excelencia. Desde
              algoritmos hasta arquitectura de software.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="h-14 px-8 rounded-full bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                Explorar Colección
              </button>
              <button className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white font-medium text-lg backdrop-blur-sm">
                Novedades del Mes
              </button>
            </div>
          </div>

          {/* Lado derecho - Libro destacado */}
          <div className="relative hidden lg:block">
            <div className="relative w-[400px] h-[550px] mx-auto transform -rotate-6 hover:rotate-0 transition-all duration-700 ease-out group cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-br from-amber-400 to-orange-600 rounded-xl shadow-[0_20px_50px_rgba(245,158,11,0.3)] group-hover:shadow-[0_30px_80px_rgba(245,158,11,0.5)] transition-all duration-500" />
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
                alt="Featured Book"
                className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] object-cover rounded-lg opacity-90 mix-blend-overlay"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-linear-to-t from-black/90 via-black/20 to-transparent rounded-xl">
                <span className="text-amber-400 font-bold tracking-wider text-sm mb-2">
                  LIBRO DESTACADO
                </span>
                <h3 className="text-3xl font-bold text-white mb-1">
                  Diseñando Aplicaciones de Datos Intensivos
                </h3>
                <p className="text-gray-300 text-sm">Martin Kleppmann</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Busqueda y Filtros - Barra flotante */}
      <section className="sticky top-4 z-40 container mx-auto px-4 mb-16">
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categorias */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300
                  ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Busqueda */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid de libros - Sentido de masonry */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-[#111115] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Contenedor de la imagen */}
              <div className="aspect-2/3 relative overflow-hidden bg-gray-900">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />

                {/* Acciones Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                  <button className="w-full bg-amber-500 text-black hover:bg-amber-400 hover:text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Agregar
                  </button>
                  <button className="w-full border-white/20 text-white hover:bg-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Vista Previa
                  </button>
                </div>

                {/* Etiqueta */}
                {book.badge && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                    {book.badge}
                  </div>
                )}

                {/* Boton de lista de deseos */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 hover:bg-white transition-all transform translate-x-10 group-hover:translate-x-0">
                  <Heart size={16} />
                </button>
              </div>

              {/* Informacion */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                    {book.category}
                  </p>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold">{book.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-amber-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{book.author}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xl font-bold text-white">
                    ${Number(book.price).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-600">({book.reviews} reseñas)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No encontramos ese libro</h3>
            <p className="text-gray-400 max-w-md">
              Intenta buscar con otros términos o explora nuestras categorías principales.
            </p>
          </div>
        )}
      </section>

      {/* SECCION DE DESTACADOS / NOTICIAS - Oscuro y Moderno */}
      <section className="container mx-auto px-4 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-black/50 to-transparent" />

          <div className="relative z-10 p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="p-2 bg-amber-500 rounded-lg">
                  <Coffee className="h-5 w-5 text-black" />
                </span>
                <span className="text-amber-300 font-bold tracking-widest text-sm">
                  CLUB DE LECTURA
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Únete a la comunidad de <br />
                <span className="text-amber-400">Lectores Élite</span>
              </h2>

              <p className="text-amber-100/80 text-lg mb-8 max-w-md">
                Recibe resúmenes semanales, descuentos exclusivos en nuevos lanzamientos y acceso a
                webinars con autores.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="px-6 py-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 grow"
                />
                <button className="px-8 py-4 h-auto rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  Suscribirse
                </button>
              </div>
              <p className="text-xs text-amber-300/60 mt-4">
                * Sin spam. Solo contenido de alta calidad.
              </p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="grid grid-cols-2 gap-4 opacity-80">
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                    <Award className="h-8 w-8 text-yellow-400 mb-2" />
                    <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                    <div className="h-2 w-12 bg-white/10 rounded" />
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                    <Zap className="h-8 w-8 text-amber-400 mb-2" />
                    <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                    <div className="h-2 w-12 bg-white/10 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                    <Book className="h-8 w-8 text-orange-400 mb-2" />
                    <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                    <div className="h-2 w-12 bg-white/10 rounded" />
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                    <Star className="h-8 w-8 text-red-400 mb-2" />
                    <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                    <div className="h-2 w-12 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
