import { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ProductPreviewDialog } from '../components/ProductPreviewDialog';
import { useFilteredCatalog } from './catalog/useFilteredCatalog';
import { CatalogGridBackground } from './catalog/CatalogGridBackground';
import {
  Book,
  Search,
  ShoppingCart,
  Star,
  Heart,
  Zap,
  Award,
  BookOpen,
  Coffee,
  Terminal,
  BOOKS_DATA,
  CATEGORIES,
  mapBookToProduct
} from './LibrosProgramacionPage.data';
import { getSearchQueryFromParams } from '../lib/catalogSearch';
import { useSearchHighlight } from '../hooks/useSearchHighlight';

export function LibrosProgramacionPage() {
  const { onAddToCart, onToggleWishlist, wishlistItems = [], onVentasClick } = useOutletContext();
  const [searchParams] = useSearchParams();
  const urlSearchQuery = getSearchQueryFromParams(searchParams);
  const highlightedProductId = searchParams.get('highlight');
  const {
    activeCategory,
    filteredItems: filteredBooks,
    searchQuery,
    setActiveCategory,
    setSearchQuery,
  } = useFilteredCatalog({
    items: BOOKS_DATA,
    initialFilter: 'Todos',
    allFilter: 'Todos',
    filterBy: (book, category) => book.category === category,
    searchBy: (book) => [book.title, book.author, book.category],
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    if (!urlSearchQuery) return;
    setActiveCategory('Todos');
    setSearchQuery(urlSearchQuery);
  }, [setActiveCategory, setSearchQuery, urlSearchQuery]);

  useSearchHighlight(highlightedProductId, filteredBooks.length);

  const mappedBooks = useMemo(() => BOOKS_DATA.map(mapBookToProduct), []);
  const selectedProduct = selectedBook ? mapBookToProduct(selectedBook) : null;

  function openBook(book) {
    setSelectedBook(book);
  }

  function handleExploreCollection() {
    if (!filteredBooks.length) {
      toast.error('No hay libros disponibles con los filtros actuales');
      return;
    }

    openBook(filteredBooks[0]);
    toast.success(`Abriendo ${filteredBooks[0].title}`);
  }

  function handleMonthlyNews() {
    setActiveCategory('Todos');
    setSearchQuery('');
    toast.info('Mostrando novedades destacadas del mes');
  }

  function handleNewsletterSubscribe() {
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      toast.error('Ingresa un correo válido para suscribirte');
      return;
    }

    toast.success('Suscripción realizada', {
      description: `Te enviaremos novedades a ${newsletterEmail}`,
    });
    setNewsletterEmail('');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30">
      {/* Efectos de fondo (Consistente con otras páginas) */}
      <CatalogGridBackground />

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
              <Terminal className="h-3.5 w-3.5" />
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
              <button
                className="h-14 px-8 rounded-full bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                onClick={handleExploreCollection}
              >
                Explorar Colección
              </button>
              <button
                className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white font-medium text-lg backdrop-blur-sm"
                onClick={handleMonthlyNews}
              >
                Novedades del Mes
              </button>
            </div>
          </div>

          {/* Lado derecho - Libro destacado */}
          <div className="relative hidden lg:block">
            <div
              className="relative w-[400px] h-[550px] mx-auto transform -rotate-6 hover:rotate-0 transition-all duration-700 ease-out group cursor-pointer"
              onClick={() => openBook(BOOKS_DATA[3])}
            >
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleExploreCollection();
              }}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid de libros - Sentido de masonry */}
      <section id="catalog-results" className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              data-search-id={`book-${book.id}`}
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
                  <button
                    className="w-full bg-amber-500 text-black hover:bg-amber-400 hover:text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                    onClick={() => onAddToCart(mapBookToProduct(book))}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4 inline" />
                    Agregar
                  </button>
                  <button
                    className="w-full border-white/20 text-white hover:bg-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
                    onClick={() => openBook(book)}
                  >
                    <BookOpen className="mr-2 h-4 w-4 inline" />
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
                <button
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 hover:bg-white transition-all transform translate-x-10 group-hover:translate-x-0"
                  onClick={() => onToggleWishlist(mapBookToProduct(book))}
                >
                  <Heart
                    className={`h-4 w-4 ${wishlistItems.includes(`book-${book.id}`) ? 'fill-current text-red-500' : ''}`}
                  />
                </button>
              </div>

              {/* Informacion */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                    {book.category}
                  </p>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3 w-3 fill-current" />
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
            <button
              className="mt-6 rounded-xl bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              onClick={() => {
                setActiveCategory('Todos');
                setSearchQuery('');
              }}
            >
              Limpiar búsqueda
            </button>
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
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNewsletterSubscribe();
                  }}
                  className="px-6 py-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 grow"
                />
                <button
                  className="px-8 py-4 h-auto rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  onClick={handleNewsletterSubscribe}
                >
                  Suscribirse
                </button>
              </div>
              <p className="text-xs text-amber-300/60 mt-4">
                * Sin spam. Solo contenido de alta calidad.
              </p>
              <button
                className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                onClick={onVentasClick}
              >
                Publicar tu propio libro técnico
              </button>
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

      <ProductPreviewDialog
        product={selectedProduct}
        onClose={() => setSelectedBook(null)}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistItems={wishlistItems}
        allProducts={mappedBooks}
        onProductClick={(product) => {
          const matchedBook = BOOKS_DATA.find((book) => `book-${book.id}` === product.id);
          if (matchedBook) setSelectedBook(matchedBook);
        }}
      />
    </div>
  );
}
