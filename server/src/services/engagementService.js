import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';
import { Product } from '../models/Product.js';
import { ProductLike } from '../models/ProductLike.js';
import { Review } from '../models/Review.js';

export async function getProductEngagement(productId, userId = null) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new GraphQLError('Producto no encontrado', {
      extensions: { code: 'NOT_FOUND' },
    });
  }

  const liked = userId
    ? Boolean(await ProductLike.exists({ product: productId, user: userId }))
    : false;

  return {
    productId: product.id,
    liked,
    likesCount: product.likesCount || 0,
    reviewsCount: product.reviewsCount || 0,
    rating: product.rating || 0,
    viewsCount: product.viewsCount || 0,
  };
}

export async function refreshReviewSummary(productId) {
  const [summary] = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
        status: 'published',
      },
    },
    {
      $group: {
        _id: '$product',
        reviewsCount: { $sum: 1 },
        rating: { $avg: '$rating' },
      },
    },
  ]);

  return Product.findByIdAndUpdate(
    productId,
    {
      reviewsCount: summary?.reviewsCount || 0,
      rating: summary ? Math.round(summary.rating * 10) / 10 : 0,
    },
    { new: true }
  );
}
