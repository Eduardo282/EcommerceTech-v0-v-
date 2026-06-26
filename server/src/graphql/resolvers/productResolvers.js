import { GraphQLError } from 'graphql';
import { Product } from '../../models/Product.js';
import { Category } from '../../models/Category.js';
import { ProductLike } from '../../models/ProductLike.js';
import { Review } from '../../models/Review.js';
import { emitProductEvent } from '../../socket/index.js';
import {
  assertValidCategory,
  buildProductCreateDoc,
  buildProductUpdateDoc,
  ensureTrendingCapacity,
} from '../../services/productService.js';
import { requireAdmin } from '../resolverUtils.js';

export const productQueries = {
  product: async (_, { id, slug }) => {
    if (!id && !slug) return null;
    const query = id ? { _id: id } : { slug };
    return Product.findOne(query).populate('category');
  },

  products: async (_, { filter, sort, pagination }) => {
    const q = {};
    if (filter?.active != null) q.active = Boolean(filter.active);
    if (filter?.isTrending != null) q.isTrending = Boolean(filter.isTrending);
    if (filter?.search) q.$text = { $search: filter.search };
    if (filter?.categorySlug) {
      const category = await Category.findOne({ slug: filter.categorySlug });
      if (!category) return [];
      q.category = category._id;
    }
    if (filter?.rubro) q.rubro = filter.rubro;
    if (filter?.minPrice != null || filter?.maxPrice != null) {
      q.originalPrice = {};
      if (filter.minPrice != null) q.originalPrice.$gte = filter.minPrice;
      if (filter.maxPrice != null) q.originalPrice.$lte = filter.maxPrice;
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 12;
    const cursor = Product.find(q).populate('category');

    switch (sort) {
      case 'PRICE_ASC':
        cursor.sort({ originalPrice: 1 });
        break;
      case 'PRICE_DESC':
        cursor.sort({ originalPrice: -1 });
        break;
      case 'RATING_DESC':
        cursor.sort({ rating: -1 });
        break;
      case 'NEWEST':
      default:
        cursor.sort({ createdAt: -1 });
    }

    return cursor.skip((page - 1) * pageSize).limit(pageSize);
  },
};

export const productMutations = {
  createProduct: async (_, { input }, ctx) => {
    requireAdmin(ctx);
    await assertValidCategory(Category, input.categoryId);
    if (input.isTrending === true) {
      await ensureTrendingCapacity(Product);
    }

    const product = await Product.create(buildProductCreateDoc(input, ctx.user));
    const populated = await product.populate('category');
    emitProductEvent(product.id, 'product:created', { productId: product.id });
    return populated;
  },

  updateProduct: async (_, { id, input }, ctx) => {
    requireAdmin(ctx);
    if (input?.isTrending === true) {
      await ensureTrendingCapacity(Product, id);
    }

    const product = await Product.findByIdAndUpdate(id, buildProductUpdateDoc(input), {
      new: true,
    }).populate('category');

    if (!product) {
      throw new GraphQLError('Producto no encontrado', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    emitProductEvent(product.id, 'product:updated', { productId: product.id });
    return product;
  },

  deleteProduct: async (_, { id }, ctx) => {
    requireAdmin(ctx);
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      await Promise.all([
        ProductLike.deleteMany({ product: id }),
        Review.deleteMany({ product: id }),
      ]);
      emitProductEvent(id, 'product:deleted', { productId: id });
    }
    return Boolean(result);
  },
};
