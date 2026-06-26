import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';
import { Product } from '../../models/Product.js';
import { ProductLike } from '../../models/ProductLike.js';
import { emitProductEvent } from '../../socket/index.js';
import { getProductEngagement } from '../../services/engagementService.js';
import { requireAuth } from '../resolverUtils.js';

export const engagementQueries = {
  productEngagement: (_, { productId }, ctx) => getProductEngagement(productId, ctx.user?.id),
};

export const engagementMutations = {
  toggleProductLike: async (_, { productId }, ctx) => {
    const user = requireAuth(ctx);
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new GraphQLError('ID de producto inválido', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    const existing = await ProductLike.findOne({
      product: productId,
      user: user.id,
    });

    let liked;
    if (existing) {
      await existing.deleteOne();
      liked = false;
    } else {
      try {
        await ProductLike.create({ product: productId, user: user.id });
      } catch (error) {
        if (error?.code !== 11000) throw error;
      }
      liked = true;
    }

    const likesCount = await ProductLike.countDocuments({ product: productId });
    const product = await Product.findByIdAndUpdate(productId, { likesCount }, { new: true });

    if (!product) {
      throw new GraphQLError('Producto no encontrado', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    const engagement = {
      productId: product.id,
      liked,
      likesCount,
      reviewsCount: product.reviewsCount || 0,
      rating: product.rating || 0,
      viewsCount: product.viewsCount || 0,
    };
    emitProductEvent(productId, 'product:engagement-updated', engagement);
    return engagement;
  },

  recordProductView: async (_, { productId }, ctx) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new GraphQLError('ID de producto inválido', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!product) {
      throw new GraphQLError('Producto no encontrado', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    const engagement = await getProductEngagement(productId, ctx.user?.id);
    emitProductEvent(productId, 'product:engagement-updated', engagement);
    return engagement;
  },
};
