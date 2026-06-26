import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';
import { Product } from '../../models/Product.js';
import { Review } from '../../models/Review.js';
import { emitProductEvent } from '../../socket/index.js';
import { refreshReviewSummary } from '../../services/engagementService.js';
import { requireAuth } from '../resolverUtils.js';

export const reviewQueries = {
  productReviews: async (_, { productId, limit }) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) return [];
    return Review.find({ product: productId, status: 'published' })
      .populate('product')
      .populate('user')
      .sort({ createdAt: -1 })
      .limit(Math.min(Math.max(limit || 20, 1), 100));
  },
};

export const reviewMutations = {
  saveProductReview: async (_, { productId, rating, comment }, ctx) => {
    const user = requireAuth(ctx);
    const normalizedComment = comment.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new GraphQLError('ID de producto inválido', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }
    if (rating < 1 || rating > 5) {
      throw new GraphQLError('La calificación debe estar entre 1 y 5', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }
    if (normalizedComment.length < 3) {
      throw new GraphQLError('La reseña debe contener al menos 3 caracteres', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }
    if (!(await Product.exists({ _id: productId }))) {
      throw new GraphQLError('Producto no encontrado', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    const review = await Review.findOneAndUpdate(
      { product: productId, user: user.id },
      {
        rating,
        comment: normalizedComment,
        status: 'published',
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    )
      .populate('product')
      .populate('user');

    const product = await refreshReviewSummary(productId);
    emitProductEvent(productId, 'product:review-saved', {
      productId,
      reviewId: review.id,
      reviewsCount: product.reviewsCount,
      rating: product.rating,
    });
    return review;
  },

  deleteProductReview: async (_, { productId }, ctx) => {
    const user = requireAuth(ctx);
    const deleted = await Review.findOneAndDelete({
      product: productId,
      user: user.id,
    });
    if (!deleted) return false;

    const product = await refreshReviewSummary(productId);
    emitProductEvent(productId, 'product:review-deleted', {
      productId,
      reviewId: deleted.id,
      reviewsCount: product.reviewsCount,
      rating: product.rating,
    });
    return true;
  },
};
