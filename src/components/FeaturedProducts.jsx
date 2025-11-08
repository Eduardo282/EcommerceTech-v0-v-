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
    <section className="py-16 bg-gradient-to-br from-[#1a2332] to-[#0f1419]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-white">{title}</h2>
          {subtitle && <p className="text-xl text-gray-300">{subtitle}</p>}
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
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
