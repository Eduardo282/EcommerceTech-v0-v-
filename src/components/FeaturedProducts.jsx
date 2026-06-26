import { ProductCard } from './ProductCard';
import PropTypes from 'prop-types';
import { useTheme } from 'next-themes';
import { getThemeColor } from '../lib/themeColors';
import { filterCatalogItems } from '../lib/catalogSearch';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

export function FeaturedProducts({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
  title,
  subtitle,
  config,
  embedded = false,
  searchQuery = '',
  highlightedProductId,
  onViewProduct,
}) {
  const { resolvedTheme } = useTheme();
  const getColor = (key, fallback) => getThemeColor(config, key, fallback, resolvedTheme);
  const visibleProducts = searchQuery ? filterCatalogItems(products, searchQuery) : products;
  const searchHighlightId = highlightedProductId || (searchQuery ? visibleProducts[0]?.id : null);
  useSearchHighlight(searchHighlightId, visibleProducts.length);

  if (embedded) {
    return (
      <div className="h-full w-full flex items-center justify-center p-2">
        <Carousel
          className="w-full h-full flex flex-col justify-center"
          opts={{
            loop: true,
            align: 'start',
          }}
        >
          <CarouselContent className="-ml-0 w-full">
            {visibleProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-0 overflow-visible"
                style={{ flex: '0 0 50%', minWidth: 0 }}
              >
                <div className="h-full w-full flex justify-center items-center">
                  {/* Container scaling: 355px fits into half of 600px (300px) -> scale 0.8 */}
                  <div
                    style={{
                      width: '355px',
                      height: '512px',
                      transform: 'scale(1)',
                      transformOrigin: 'center center',
                      flexShrink: 0,
                    }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      isInWishlist={wishlistItems.includes(product.id)}
                      onViewProduct={onViewProduct}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-4 mt-[-60px] z-10 relative">
            <CarouselPrevious className="static -translate-y-60 bg-black/50 hover:bg-black/70 border-white/10 -translate-x-6" />
            <CarouselNext className="static -translate-y-60 bg-black/50 hover:bg-black/70 border-white/10 translate-x-[725px]" />
          </div>
        </Carousel>
      </div>
    );
  }

  return (
    <section
      id="catalog-results"
      className="py-20 bg-background dark:bg-[var(--feat-bg,#fff)]"
      style={{
        '--feat-bg': getColor('fondoDestacadosColor', '#fff'),
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2
            className="text-4xl mb-5 font-display text-foreground dark:text-[var(--feat-title,#fff)]"
            style={{ '--feat-title': getColor('titleDestacadosColor', '#fff') }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-lg max-w-2xl mx-auto text-muted-foreground dark:text-[var(--feat-desc,#fff)]"
              style={{ '--feat-desc': getColor('descripcionDestacadosColor', '#fff') }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 list-none">
          {visibleProducts.map((product) => (
            <li key={product.id} className="contents">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.includes(product.id)}
                onViewProduct={onViewProduct}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

FeaturedProducts.propTypes = {
  products: PropTypes.array,
  onAddToCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  config: PropTypes.object,
  embedded: PropTypes.bool,
  searchQuery: PropTypes.string,
  highlightedProductId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onViewProduct: PropTypes.func,
};
