const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop';

export function mapProduct(product) {
  const images = Array.isArray(product?.images)
    ? [...new Set(product.images.filter(Boolean))]
    : [];
  const primaryImage = images[0] || FALLBACK_IMAGE;
  const price = Number(product?.descuentoPrice ?? product?.originalPrice ?? 0);
  const originalPrice = product?.descuentoPrice ? Number(product?.originalPrice ?? 0) : null;

  return {
    id: String(product.id),
    name: product.title,
    category: product?.category?.name || 'General',
    price: price.toFixed(2),
    originalPrice: originalPrice == null ? null : originalPrice.toFixed(2),
    rating: Number(product.rating ?? 0),
    reviews: Number(product.reviewsCount ?? 0),
    likes: Number(product.likesCount ?? 0),
    image: primaryImage,
    images: images.length > 0 ? images : [primaryImage],
    sales: Number(product.downloadsCount ?? product.salesCount ?? 0),
    views: Number(product.viewsCount ?? 0),
    badge: product.descuentoPrice ? 'Oferta' : product.badge,
    features: product.features || (product.attributes ? Object.keys(product.attributes).slice(0, 3) : undefined),
    descuentoPrice: product.descuentoPrice,
    isTrending: product.isTrending === true,
    rubro: product.rubro,
    details: product.details,
    specs: product.specs,
    includes: product.includes,
    description: product.description,
    longDescription: product.longDescription,
  };
}
