import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../graphql/queries';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { useRubro } from '../context/useRubro';
import { mapProduct } from '../features/products/productMapper';
import { getSearchQueryFromParams } from '../lib/catalogSearch';

export function NuevosLanzamientosPage() {
  const { onAddToCart, onToggleWishlist, wishlistItems } = useOutletContext();
  const [searchParams] = useSearchParams();
  const { rubro } = useRubro();
  const searchQuery = getSearchQueryFromParams(searchParams);
  const highlightedProductId = searchParams.get('highlight');

  // Query para nuevos lanzamientos (Sort: NEWEST)
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: 'NEWEST',
      pagination: { page: 1, pageSize: 24 }, // Traer más productos
      filter: { rubro },
    },
    fetchPolicy: 'cache-and-network',
  });

  const products = useMemo(
    () => (data?.products || []).map((product) => ({ ...mapProduct(product), badge: product.badge || 'Nuevo' })),
    [data]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20">
      {/* Background similar a otras paginas */}
      <div className="fixed inset-0 bg-[#0a0a0a] -z-10" />
      <div
        className="fixed inset-0 opacity-20 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-400"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M9 3v4" />
              <path d="M7 5h4" />
              <path d="M3 7h4" />
            </svg>
            <span className="text-sm font-medium text-amber-300">Recién Llegados</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Nuevos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Lanzamientos
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Descubre las últimas adiciones a nuestra colección. Herramientas y recursos frescos para
            potenciar tus proyectos.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <p>Error al cargar los productos. Por favor intenta de nuevo.</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Reutilizamos FeaturedProducts pero sin el modo embedded slider, sino grid normal si quisiéramos, 
                pero FeaturedProducts tiene un modo 'grid' ? 
                Mirando FeaturedProducts.jsx, renderiza una grid si embedded={false} (default). 
                Así que podemos usarlo directamente.
            */}
            <FeaturedProducts
              products={products}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              wishlistItems={wishlistItems}
              title="" // Ya pusimos titulo arriba custom
              subtitle=""
              config={{
                // Mock config para colores si FeaturedProducts los usa
                fondoDestacadosColor: 'transparent',
                titleDestacadosColor: '#fff',
                descripcionDestacadosColor: '#9ca3af',
              }}
              searchQuery={searchQuery}
              highlightedProductId={highlightedProductId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
