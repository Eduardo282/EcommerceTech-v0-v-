import { ProductCard } from "./ProductCard";

export function FeaturedProducts({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
  title,
  subtitle,
}) {
  return (
    <section
      className="py-20"
      style={{
        backgroundColor: "black",
      }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234,179,8,0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234,179,8,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 font-display gold-text drop-shadow-gold">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-amber-200/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 list-none">
          {products.map((product) => (
            <li key={product.id} className="contents">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistItems.includes(product.id)}
                allProducts={products}
                wishlistItems={wishlistItems}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
