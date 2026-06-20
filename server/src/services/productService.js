import { GraphQLError } from 'graphql';

const MAX_TRENDING_PRODUCTS = 2;

export async function ensureTrendingCapacity(Product, excludedProductId = null) {
  const query = { isTrending: true };
  if (excludedProductId) query._id = { $ne: excludedProductId };

  const trendingCount = await Product.countDocuments(query);
  if (trendingCount >= MAX_TRENDING_PRODUCTS) {
    throw new GraphQLError(
      'Solo puede haber 2 productos en tendencias. Quitá uno antes de agregar otro.',
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  }
}

export async function assertValidCategory(Category, categoryId) {
  if (categoryId && await Category.exists({ _id: categoryId })) return;

  throw new GraphQLError('Seleccioná una categoría válida', {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}

export function buildProductCreateDoc(input, user) {
  return {
    title: input.title,
    description: input.description || '',
    longDescription: input.longDescription || '',
    details: input.details || [],
    specs: input.specs || [],
    includes: input.includes || [],
    originalPrice: input.originalPrice,
    descuentoPrice: input.descuentoPrice ?? null,
    images: input.images || [],
    category: input.categoryId || null,
    inventory: input.inventory ?? 0,
    attributes: input.attributes || {},
    active: input.isTrending === true ? true : (input.active ?? true),
    isTrending: input.isTrending ?? false,
    rubro: input.rubro || user?.rubro || 'TECHNOLOGY',
    badge: input.badge || null,
    features: input.features || [],
  };
}

export function buildProductUpdateDoc(input = {}) {
  const update = { ...input };

  if (input.isTrending === true) update.active = true;
  if (input.categoryId != null) {
    update.category = input.categoryId;
    delete update.categoryId;
  }

  return update;
}
